<?php
 
class Mango_AjaxList_Model_Layer_Filter_Price extends Mage_Catalog_Model_Layer_Filter_Price
{
/**
     * Get information about products count in range
     *
     * @param   int $range
     * @return  int
     */
    public function getRangeItemCounts($range)
    {
        $rangeKey = 'range_item_counts_' . $range;
        $items = $this->getData($rangeKey);
        if (is_null($items)) {
            $items = $this->_getResource()->getCount($this, $range);
            $this->setData($rangeKey, $items);
        }
        return $items;
    }

/**
     * Get price range for building filter steps
     *
     * @return int
     */
    public function getPriceRange()
    {
       
        return $this->getMaxPriceInt();
    }


     /**
     * Get data for build price filter items
     *
     * @return array
     */
    protected function _getItemsData()
    {
        $key = $this->_getCacheKey();
        $data = $this->getLayer()->getAggregator()->getCacheData($key);


            



        if ($data === null) {
            $dbRanges   = $this->getRangeItemCounts($this->getMaxPriceInt());
            foreach ($dbRanges as $index=>$count) {
                $data[] = array(
                    'label' => $this->_renderItemLabel(0, $this->getMaxPriceInt()),
                    'value' => 0 . ',' . $this->getMaxPriceInt(),
                    'count' => $count,
                );
            }
            $tags = array(
                Mage_Catalog_Model_Product_Type_Price::CACHE_TAG,
            );
            $tags = $this->getLayer()->getStateTags($tags);
            $this->getLayer()->getAggregator()->saveCacheData($data, $key, $tags);
        }
        return $data;
    }

    



    /**
     * Apply price range filter to collection
     *
     * @return Mage_Catalog_Model_Layer_Filter_Price
     */
    public function apply(Zend_Controller_Request_Abstract $request, $filterBlock)
    {
        /**
         * Filter must be string: $index,$range
         */

        $filter = $request->getParam($this->getRequestVar());
        if (!$filter) {
            return $this;
        }
        $filter = explode(',', $filter);
        if (count($filter) != 2) {
            return $this;
        }
        //added price min - maximum
        list($price_min, $price_max) = $filter;

        if ((int)$price_min >=0 && (int)$price_max) {
            $this->setPriceRange((int)($price_max - $price_min)  );

            $this->_getResource()->applyFilterToCollection($this, $price_min, $price_max);
            $this->getLayer()->getState()->addFilter(
                $this->_createItem($this->_renderItemLabel($price_min, $price_max), $filter)
            );

            //$this->_items = array();
        }
        return $this;
    }


    /**
     * Prepare text of item label
     *
     * @param   int $range
     * @param   float $value
     * @return  string
     */
    protected function _renderItemLabel($price_min, $price_max)
    {
        $store      = Mage::app()->getStore();
        $fromPrice  = $store->formatPrice($price_min);
        $toPrice    = $store->formatPrice($price_max);
        return Mage::helper('catalog')->__('%s - %s', $fromPrice, $toPrice);
    }


    public function getItemsCount(){
        return 1;

    }
    
}

