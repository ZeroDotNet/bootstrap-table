/**
 * @author: Nicolas Pascual
 * @webSite: http://www.hawkant.com
 * @version: v1.0.0
 */

!function ($) {

		'use strict';

		$.extend($.fn.bootstrapTable.defaults, {
			wildcard: "%",
			delimiter: " "
		});

		var BootstrapTable = $.fn.bootstrapTable.Constructor,
				_initSearch = BootstrapTable.prototype.initSearch;

		BootstrapTable.prototype.initSearch = function () {
				if ((this.options.wildcard + '') !== '') {
						if (this.searchText === undefined) {
								return;
						}
						var strArray = this.searchText.split(this.options.delimiter),
							that = this,
							f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns,
							dataFiltered = [];
						var str = strArray[i].trim();
						for (var i = 0; i < strArray.length; i++) {
								dataFiltered = str ? $.grep(dataFiltered.length === 0 ? this.options.data : dataFiltered, function (item, i) {
										for (var key in item) {
												key = $.isNumeric(key) ? parseInt(key, 10) : key;
												var value = item[key],
														column = that.columns[$.fn.bootstrapTable.utils.getFieldIndex(that.columns, key)],
														j = $.inArray(key, that.header.fields);

												// Fix #142: search use formated data
												if (column && column.searchFormatter) {
														value = $.fn.bootstrapTable.utils.calculateObjectValue(column,
																that.header.formatters[j], [value, item, i], value);
												}

												var index = $.inArray(key, that.header.fields);
												if (index !== -1 && that.header.searchables[index] && (typeof value === 'string' || typeof value === 'number')) {
														// there is no difference between strict or not search.
														if (that.options.strictSearch) {
																return new RegExp("^" + (str + '').split(this.options.wildcard).join(".*") + "$").test(value);
														} else {
																return new RegExp("^" + (str + '').split(this.options.wildcard).join(".*") + "$").test(value);
														}
												}
										}
										return false;
						}) : this.data;
							this.data = dataFiltered;
						}
				} else {
						_initSearch.apply(this, Array.prototype.slice.apply(arguments));
				}
		};

}(jQuery);
