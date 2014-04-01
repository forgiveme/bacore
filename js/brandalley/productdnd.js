var isBackend = typeof FORM_KEY != 'undefined';

function changeOrder(categoryId, productId, neighbourId, ajaxBlockUrl, listId, listTag) {
    if (!isBackend) {
        // display centered loader hint box with icon and text
        var scrollTop = $(document).viewport.getScrollOffsets().top;
        var avTop = ($(document).viewport.getHeight() / 2) - ($('productdnd-preloader').getLayout().get('margin-box-height') / 2) + scrollTop;

        if (avTop <= 10) {
            avTop = 10;
        }

        var styles = { top: avTop + 'px' };

        $('productdnd-preloader').setStyle(styles);
        $('productdnd-preloader').removeClassName('hide');
    }

    new Ajax.Request(ajaxBlockUrl, {
        parameters: {
            categoryId: categoryId,
            productId: productId,
            neighbourId: neighbourId,
            isAjax: 'true',
            form_key: isBackend ? FORM_KEY : ''
        },
        onSuccess: function (transport) {
            if (isBackend) {
                try {
                    if (transport.responseText.isJSON()) {
                        var response = transport.responseText.evalJSON();
                        if (response.error) {
                            alert(response.message);
                        }
                        if (response.ajaxExpired && response.ajaxRedirect) {
                            setLocation(response.ajaxRedirect);
                        }
                        resetListItems(listId, listTag, response);
                    } else {
                        alert(transport.responseText);
                    }
                }
                catch (e) {
                    alert(transport.responseText);
                }
            } else {
                $('productdnd-preloader').addClassName('hide');
            }
        }
    });
}

function processSorting(categoryId, listId, listTag, ajaxUrl) {
    var listItemId;

    if (isBackend) {


        /**
         * Firefox bug/feature workaround for checkbox deselecting in the category products grid
         */

        $(listId).select(listTag).each(function (item) {

            clickEvents = item.getStorage().get('prototype_event_registry').get('click');
            clickEvents.each(function (wrapper) {
                //console.log(wrapper.handler);
                Event.observe(item.select('.checkbox').first(), 'click', wrapper.handler);
            })
            item.stopObserving('click');
        });
    }

    Sortable.create(listId, { tag: listTag,
        onUpdate: function (list) {
            var listSize = list.length;
            var counter = 0;
            list.select(listTag).each(function (item) {
                counter++;
                if (item.getAttribute('id') == listItemId) {

                    if (counter == 1) {
                        var delta = 0 - item.getAttribute('id').replace('item_', '');
                    } else {
                        var previousItem = item.previous().getAttribute('id').replace('item_', '');
                        var delta = previousItem - item.getAttribute('id').replace('item_', '');
                    }

                    var productId = getProductId(item, listTag);
                    var neighbourId = getProductId(delta > 0 ? item.previous() : item.next(), listTag);

                    changeOrder(categoryId, productId, neighbourId, ajaxUrl, listId, listTag);
                    resetListItems(listId, listTag);
                    throw $break;
                }
            });
        },
        onChange: function (item) {
            listItemId = item.getAttribute('id');
        }
    });

}

function resetListItems(listId, listTag, newOrder) {
    var i = 0;
    var changePositions = false;
    var inputElement, newId;
    if (typeof newOrder == 'object') {

        newOrder = object2array(newOrder);
        changePositions = true;
    }

    $(listId).select(listTag).each(function (item) {
        i++;
        item.setAttribute('id', 'item_' + i);
        if (changePositions) {
            newId = newOrder[getProductId(item, listTag)];
            if (newId !== undefined) {
                inputElement = item.select('input[type=text]').first();

                inputElement.setAttribute('value', newId);
                inputElement.triggerEvent('keyup');
            }
        }

    });
}

function getProductId(item, listTag) {
    if (listTag == 'tr') {
        var productId = item.down().next().innerHTML;
    } else {
        var productId = item.getAttribute('productId');
    }
    return parseInt(productId);
}

function object2array(obj) {
    var arr = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr[key] = obj[key];
        }
    }
    return arr;
}

function resetListItemsFrontend(listId, listTag, dndproducts) {
    var i = 0;
    var productIds = dndproducts.evalJSON();


    $(listId).select(listTag + '.item').each(function (item) {

        i++;
        item.setAttribute('id', 'item_' + i);
        item.setAttribute('productId', productIds[i - 1]);
        item.addClassName('dnd-item');
    });
}

Element.prototype.triggerEvent = function (eventName) {
    if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, true);

        this.dispatchEvent(evt);
    }

    if (this.fireEvent) {
        this.fireEvent('on' + eventName);
    }
};
varienGrid.prototype.reload = function (url) {

    if (!this.reloadParams) {
        this.reloadParams = {form_key: FORM_KEY};
    }
    else {
        this.reloadParams.form_key = FORM_KEY;
    }
    url = url || this.url;
    if (this.useAjax) {
        new Ajax.Request(url + (url.match(new RegExp('\\?')) ? '&ajax=true' : '?ajax=true' ), {
            loaderArea: this.containerId,
            parameters: this.reloadParams || {},
            evalScripts: true,
            onFailure: this._processFailure.bind(this),
            onComplete: this.initGridAjax.bind(this),
            onSuccess: function (transport) {
                try {
                    var responseText = transport.responseText.replace(/>\s+</g, '><');

                    if (transport.responseText.isJSON()) {
                        var response = transport.responseText.evalJSON()
                        if (response.error) {
                            alert(response.message);
                        }
                        if (response.ajaxExpired && response.ajaxRedirect) {
                            setLocation(response.ajaxRedirect);
                        }
                    } else {
                        /**
                         * For IE <= 7.
                         * If there are two elements, and first has name, that equals id of second.
                         * In this case, IE will choose one that is above
                         *
                         * @see https://prototype.lighthouseapp.com/projects/8886/tickets/994-id-selector-finds-elements-by-name-attribute-in-ie7
                         */
                        var divId = $(this.containerId);
                        if (divId.id == this.containerId) {
                            divId.update(responseText);
                        } else {
                            $$('div[id="' + this.containerId + '"]')[0].update(responseText);
                        }
                    }
                } catch (e) {
                    var divId = $(this.containerId);
                    if (divId.id == this.containerId) {
                        divId.update(responseText);
                    } else {
                        $$('div[id="' + this.containerId + '"]')[0].update(responseText);
                    }
                }
            }.bind(this)
        });

       refreshDivReloaded.delay(0.5,1);
        return;
    }
    else {
        if (this.reloadParams) {
            $H(this.reloadParams).each(function (pair) {
                url = this.addVarToUrl(pair.key, pair.value);
            }.bind(this));
        }
        location.href = url;
    }
};



function refreshDivReloaded(i) {

    if($('loading-mask').getStyle('display')=='block'){

        return refreshDivReloaded.delay(i*2+1,i++);
    }
    $('catalog_category_products_table').down('tbody').setAttribute('id', 'catalog_category_products_table_tbody');

    window.listId = 'catalog_category_products_table_tbody';
    resetListItems(window.listId, window.listTag);
    processSorting(window.categoryId, window.listId, window.listTag, window.ajaxUrl);

}


