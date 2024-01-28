<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Центры слуха');
$APPLICATION->AddChainItem('Центры слуха', '/centers/');
?>
<section class="map">
    <div class="_container">
        <h1 class="section-title map__title">Центры слуха
            <div class="map__change">
                <select class="mySelect">
                    <option value="">Алма-Ата </option>
                </select>
            </div>
        </h1>
        <div class="map-content" id="map"></div>
    </div>
</section>

<script>
    try {
        window.addEventListener('DOMContentLoaded', () => {
            ymaps.ready(function () {
                // Создание экземпляра карты и его привязка к созданному контейнеру.
                var myMap = new ymaps.Map('map', {
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
                        '$[[options.contentLayout observeSize minWidth=220 maxWidth=220 maxHeight=417]]' +
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

                                if (!this._isElement(this._$element)) {
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

                    // Создание метки с пользовательским макетом балуна.
                    myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                        balloonHeader: 'Центр слуха на пр-т Назарбаева, 77',
                        balloonContent: '<ul><li><span>Адрес</span><span>Алматы, ул. пр-т Назарбаева, 77</span></li><li><span>Время работы</span><span>Пн-Пт: 10:00-19:00<br>Сб-Вс: 10:00-17:00</span></li><li><span>Телефон</span><span>+7 (727) 312-27-03</span></li><li><span>Электронная почта</span><span>info@athear.kz</span></li><li class="popover__footer"><a class="btn btn--icn btn--red btn--m" href="#" data-target="modal-reg"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H7V3C7 2.44772 7.44772 2 8 2ZM7 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V6H9V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6Z" fill="white"></path><path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="white"></path><path d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z" fill="white"></path><path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill="white"></path><path d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z" fill="white"></path><path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z" fill="white"></path></svg>Записаться на приём</a></li></ul>'
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

                myMap.geoObjects.add(myPlacemark);
            });
        });
    } catch (e) {
        console.log(e);
    }
</script>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
