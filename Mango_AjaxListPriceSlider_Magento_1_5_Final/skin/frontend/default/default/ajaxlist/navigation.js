jQuery(document).ready(function(){var q=true;var o=true;var h="";var f="";function p(i){window.reload_nav=i}function d(){return window.reload_nav}function t(i){window.reload_compare=i}function n(){return window.reload_compare}function b(i){window.cartDeleteText=i}p(true);t(true);var e=location.hash.slice(1);if(e!=""){s()}jQuery(window).hashchange(function(i){s()});function r(){min_price=0;max_price=parseInt(jQuery("input#price_maximum").val());step_val=jQuery("input#step_value").val();step_val=parseInt(step_val);jQuery("#slider-range-price").slider({range:true,min:0,max:max_price,step:step_val,values:[jQuery("#init_price_minimum").val(),jQuery("#init_price_maximum").val()],slide:function(j,i){jQuery("input#price_maximum").val(jQuery("#slider-range-price").slider("values",1));jQuery("input#price_minimum").val(jQuery("#slider-range-price").slider("values",0))},change:function(j,i){jQuery("input#price_maximum").val(jQuery("#slider-range-price").slider("values",1));jQuery("input#price_minimum").val(jQuery("#slider-range-price").slider("values",0));new_url=g(jQuery("#price_slider_url").val())+"&price="+jQuery("#slider-range-price").slider("values",0)+","+jQuery("#slider-range-price").slider("values",1);p(true);t(false);window.location.hash=c(new_url)}});jQuery("input#price_maximum").val(jQuery("#slider-range-price").slider("values",1));jQuery("input#price_minimum").val(jQuery("#slider-range-price").slider("values",0))}r();jQuery(".pager select, .toolbar select").live("change",function(){p(true);t(true);window.location.hash=c(jQuery(this).val());return false});jQuery(".pager a, .toolbar a").live("click",function(){p(false);t(false);window.location.hash=c(jQuery(this).attr("href"));return false});jQuery(".block-layered-nav #narrow-by-list a, .block-layered-nav .currently a, .block-layered-nav .actions a").live("click",function(){p(true);t(true);if(jQuery(this).attr("id")=="price-filter-button"){step_val=parseInt(jQuery("input#step_value").val());request_price_min=Math.floor(jQuery("#price_minimum").val()/step_val)*step_val;request_price_max=Math.ceil(jQuery("#price_maximum").val()/step_val)*step_val;new_url=g(jQuery("#price_slider_url").val())+"&price="+request_price_min+","+request_price_max;window.location.hash=c(new_url)}else{window.location.hash=c(jQuery(this).attr("href"))}return false});jQuery(".col-main .add-to-links a.link-compare").live("click",function(){p(false);t(true);a(jQuery(this).attr("href"),false,true);return false});jQuery(".block.block-compare a.btn-remove, .block.block-compare .actions a").live("click",function(){p(false);t(true);a(jQuery(this).attr("href"),false,true);return false});jQuery("#price_minimum, #price_maximum").live("keyup",function(i){if(i.keyCode==13){jQuery("#price-filter-button").click()}});function s(){var i=location.hash.slice(1);path=window.location.href;path=path.split("#")[0];path=path.split("?")[0];path=g(path+"?"+i);nv=d();cm=n();a(path,nv,cm,false);p(true);t(true)}function a(l,k,j,i){l=g(l);jQuery(".col-main").append('<div class="products-list-loader"><div></div></div>');if(k){jQuery(".block-layered-nav").append('<div class="products-list-loader"><div></div></div>')}jQuery.get(l,{},function(u,m,w){if(m=="error"){jQuery(".col-main").html("<p>There was an error making the AJAX request</p>")}else{var v=jQuery("<div />").html(u);jQuery(".col-main").html(v.find(".col-main").html());if(k){jQuery(".block-layered-nav").html(v.find(".block-layered-nav").html());r()}if(j){jQuery(".block-compare").html(v.find(".block-compare").html())}if(i){jQuery(".block-cart").html(v.find(".block-cart").html())}if(typeof(window.ajaxproload)=="function"){ajaxproload()}}})}function g(i){if(i.indexOf("ajax=1")<0){if(i.indexOf("?")<0){i=i+"?ajax=1"}else{i=i+"&ajax=1"}}return i}function c(j){j.match(/\?(.+)$/);var i=RegExp.$1;if(i.indexOf("ajax=1")>=0){i=i.replace("ajax=1&","");i=i.replace("&ajax=1","");i=i.replace("ajax=1","")}return i}jQuery("#products-list button.btn-cart").live("click",function(){a(jQuery(this).attr("rel"),false,false,true);return false})});