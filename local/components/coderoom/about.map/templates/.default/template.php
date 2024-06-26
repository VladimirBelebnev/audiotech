<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 */
?>

<div class="map">
    <h2 class="section-title map__title"> <span>Центры слуха Audiotech</span>
        <!--                                    <div class="select-place">-->
        <!--                                        <select class="mySelect">-->
        <!--                                            <option value="Алма-Ата">Алма-Ата</option>-->
        <!--                                            <option value="Алма-Ата">Алма-Ата</option>-->
        <!--                                            <option value="Алма-Ата">Алма-Ата</option>-->
        <!--                                        </select>-->
        <!--                                    </div>-->
    </h2>
    <div class="map-content map-content--about" id="map-about"></div>
    <script>
        try {
            window.addEventListener('DOMContentLoaded', () => {
                ymaps.ready(function () {
                    // Создание экземпляра карты и его привязка к созданному контейнеру.
                    var myMap = new ymaps.Map('map-about', {
                            center: [43.261026, 76.945600],
                            zoom: 15,
                            behaviors: ['default', 'scrollZoom'],
                            controls: [],
                        }),

                        // Создание макета балуна на основе Twitter Bootstrap.
                        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                            '<div class="popover top">' +
                            '<a class="close" href="#"><img src="/local/templates/audiotech/images/icns/md-x.svg"></a>' +
                            '<div class="arrow"></div>' +
                            '<div class="popover-inner">' +
                            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
                            '</div>' +
                            '</div>', {
                                /**
                                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                                 * @function
                                 * @name build
                                 */
                                build: function () {
                                    this.constructor.superclass.build.call(this);

                                    this._$element = $('.popover', this.getParentElement());

                                    this.applyElementOffset();

                                    this._$element.find('.close')
                                        .on('click', $.proxy(this.onCloseClick, this));
                                },

                                /**
                                 * Удаляет содержимое макета из DOM.
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                                 * @function
                                 * @name clear
                                 */
                                clear: function () {
                                    this._$element.find('.close')
                                        .off('click');

                                    this.constructor.superclass.clear.call(this);
                                },

                                /**
                                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                                 * @function
                                 * @name onSublayoutSizeChange
                                 */
                                onSublayoutSizeChange: function () {
                                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                                    if(!this._isElement(this._$element)) {
                                        return;
                                    }

                                    this.applyElementOffset();

                                    this.events.fire('shapechange');
                                },

                                /**
                                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                                 * @function
                                 * @name applyElementOffset
                                 */
                                applyElementOffset: function () {
                                    this._$element.css({
                                        left: -(this._$element[0].offsetWidth / 2),
                                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                                    });
                                },

                                /**
                                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                                 * @function
                                 * @name onCloseClick
                                 */
                                onCloseClick: function (e) {
                                    e.preventDefault();

                                    this.events.fire('userclose');
                                },

                                /**
                                 * Используется для автопозиционирования (balloonAutoPan).
                                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                                 * @function
                                 * @name getClientBounds
                                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                                 */
                                // getShape: function () {
                                //     if(!this._isElement(this._$element)) {
                                //         return MyBalloonLayout.superclass.getShape.call(this);
                                //     }

                                //     var position = this._$element.position();

                                //     return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                                //         [position.left, position.top], [
                                //             position.left + this._$element[0].offsetWidth,
                                //             position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                //         ]
                                //     ]));
                                // },

                                /**
                                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                                 * @function
                                 * @private
                                 * @name _isElement
                                 * @param {jQuery} [element] Элемент.
                                 * @returns {Boolean} Флаг наличия.
                                 */
                                _isElement: function (element) {
                                    return element && element[0] && element.find('.arrow')[0];
                                }
                            }),

                        // Создание вложенного макета содержимого балуна.
                        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                            '<div class="popover-content">$[properties.balloonContent]</div>'
                        ),

                        <?php foreach ($arResult['ITEMS'] as $key => $arItem) { ?>
                        myPlacemark<?php echo $key; ?> = window.myPlacemark = new ymaps.Placemark([<?php echo $arItem['COORDINATES_VALUE'] ?>], {
                            balloonHeader: '<?php echo $arItem['NAME']; ?>',
                            balloonContent: '<ul><li><span>Адрес</span><span><?php echo $arItem['ADDRESS_VALUE']; ?></span></li><li><span>Время работы</span><span><?php echo $arItem['TIME_VALUE']; ?></span></li><li><span>Телефон</span><span><?php echo $arItem['PHONE_VALUE']; ?></span></li><li><span>Электронная почта</span><span><?php echo $arItem['EMAIL_VALUE']; ?></span></li></ul>'
                        }, {
                            balloonShadow: false,
                            balloonLayout: MyBalloonLayout,
                            balloonContentLayout: MyBalloonContentLayout,
                            balloonPanelMaxMapArea: 0,
                            // Не скрываем иконку при открытом балуне.
                            hideIconOnBalloonOpen: false,
                            // И дополнительно смещаем балун, для открытия над иконкой.
                            // balloonOffset: [3, -40]
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#image',
                            // Своё изображение иконки метки.
                            iconImageHref: '/local/templates/audiotech/images/icns/sm-location-marker.svg',
                            // Размеры метки.
                            iconImageSize: [32, 32],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            hideIconOnBalloonOpen: false,
                            iconImageOffset: [-5, -38]
                        });
                        <?php } ?>

                    <?php foreach ($arResult['ITEMS'] as $key => $arItem) { ?>
                        myMap.geoObjects.add(myPlacemark<?php echo $key; ?>);
                    <?php } ?>
                });
            });
        } catch (e) {
            console.log(e);
        }
    </script>
</div>