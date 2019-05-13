(function ($) {
    Drupal.behaviors.gfAjaxViewsExpFilter = {
        attach: function (context, settings) {

            const viewsExpFilters = settings.gf_catalog_filter;

            let msgString = '<strong>' + 
                Drupal.t('Your select:  ') + '</strong>';
            let filterArr = new Array();

            for (let filter of viewsExpFilters) {
                let selected;
                let filterVal;
                if (filter == 'price') {
                    selected = $('#edit-price-min');
                    filterVal = selected.val() + '-' + $('#edit-price-max').val();
                }
                else {
                    selected = $('select[name=' + filter + ']').find('option:selected');
                    filterVal = selected.text();
                }
                if (selected.length == 0 || selected.val() == 'All' || 
                    filterVal == '0-9999') continue;
                let label = selected.parents().siblings('label').text()
                let item = label.trim() + ': ' + filterVal;
                if (filterArr.includes(item)){
                    continue;
                }
                filterArr.push(item);
            }

            if (filterArr.length) {
                msgString += '<span>' + filterArr.join(', ') + '</span>';
                $('#exp-filter-result-box','#views-exposed-form-products-main-catalog').html(msgString);
            }
        }
    };
})(jQuery);

