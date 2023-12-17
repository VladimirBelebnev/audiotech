try {
    window.addEventListener('DOMContentLoaded', () => {
        ymaps.ready(function () {
            // Создание экземпляра карты и его привязка к созданному контейнеру.
            var myMap = new ymaps.Map('map-about', {
                    center: [55.751574, 37.573856],
                    zoom: 9,
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

                // Создание метки с пользовательским макетом балуна.
                myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    balloonHeader: 'Центр слух на ул. Макатаева, 18',
                    balloonContent: '<ul><li><span>Адрес</span><span>900524, Алма-Ата, ул. Макатаева, 18</span></li><li><span>Время работы</span><span>Пн-Пт: 8:00-20:00<br>Выходные: Сб, Вс</span></li><li><span>Телефон</span><span>+7 (900) 232-23-23</span></li><li><span>Электронная почта</span><span>kazahstan@audiotech.ru</span></li></ul>'
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
                }),
                myPlacemark2 = window.myPlacemark = new ymaps.Placemark([55.676754, 37.893324], {
                    balloonHeader: 'Центр слух на ул. Макатаева, 18',
                    balloonContent: '<ul><li><span>Адрес</span><span>900524, Алма-Ата, ул. Макатаева, 18</span></li><li><span>Время работы</span><span>Пн-Пт: 8:00-20:00<br>Выходные: Сб, Вс</span></li><li><span>Телефон</span><span>+7 (900) 232-23-23</span></li><li><span>Электронная почта</span><span>kazahstan@audiotech.ru</span></li></ul>'
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

            myMap.geoObjects.add(myPlacemark),
                myMap.geoObjects.add(myPlacemark2);
        });
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYWxsb29uX2h0bWwtYWJvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsieW1hcHMucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0Y3QutC30LXQvNC/0LvRj9GA0LAg0LrQsNGA0YLRiyDQuCDQtdCz0L4g0L/RgNC40LLRj9C30LrQsCDQuiDRgdC+0LfQtNCw0L3QvdC+0LzRgyDQutC+0L3RgtC10LnQvdC10YDRgy5cbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdtYXAtYWJvdXQnLCB7XG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43NTE1NzQsIDM3LjU3Mzg1Nl0sXG4gICAgICAgICAgICB6b29tOiA5LFxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbJ2RlZmF1bHQnLCAnc2Nyb2xsWm9vbSddLFxuICAgICAgICAgICAgY29udHJvbHM6IFtdLFxuICAgICAgICB9KSxcblxuICAgICAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC80LDQutC10YLQsCDQsdCw0LvRg9C90LAg0L3QsCDQvtGB0L3QvtCy0LUgVHdpdHRlciBCb290c3RyYXAuXG4gICAgICAgIE15QmFsbG9vbkxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wb3ZlciB0b3BcIj4nICtcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjbG9zZVwiIGhyZWY9XCIjXCI+PGltZyBzcmM9XCJpbWcvaWNucy9tZC14LnN2Z1wiPjwvYT4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWlubmVyXCI+JyArXG4gICAgICAgICAgICAgICAgJyRbW29wdGlvbnMuY29udGVudExheW91dCBvYnNlcnZlU2l6ZSBtaW5XaWR0aD0yMzUgbWF4V2lkdGg9MjM1IG1heEhlaWdodD0zNTBdXScgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+Jywge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCh0YLRgNC+0LjRgiDRjdC60LfQtdC80L/Qu9GP0YAg0LzQsNC60LXRgtCwINC90LAg0L7RgdC90L7QstC1INGI0LDQsdC70L7QvdCwINC4INC00L7QsdCw0LLQu9GP0LXRgiDQtdCz0L4g0LIg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5IEhUTUwt0Y3Qu9C10LzQtdC90YIuXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvbGF5b3V0LnRlbXBsYXRlQmFzZWQuQmFzZS54bWwjYnVpbGRcbiAgICAgICAgICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgKiBAbmFtZSBidWlsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3Iuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50ID0gJCgnLnBvcG92ZXInLCB0aGlzLmdldFBhcmVudEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUVsZW1lbnRPZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5maW5kKCcuY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICQucHJveHkodGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0KPQtNCw0LvRj9C10YIg0YHQvtC00LXRgNC20LjQvNC+0LUg0LzQsNC60LXRgtCwINC40LcgRE9NLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cHM6Ly9hcGkueWFuZGV4LnJ1L21hcHMvZG9jL2pzYXBpLzIuMS9yZWYvcmVmZXJlbmNlL2xheW91dC50ZW1wbGF0ZUJhc2VkLkJhc2UueG1sI2NsZWFyXG4gICAgICAgICAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICogQG5hbWUgY2xlYXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5maW5kKCcuY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZignY2xpY2snKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0JzQtdGC0L7QtCDQsdGD0LTQtdGCINCy0YvQt9Cy0LDQvSDRgdC40YHRgtC10LzQvtC5INGI0LDQsdC70L7QvdC+0LIg0JDQn9CYINC/0YDQuCDQuNC30LzQtdC90LXQvdC40Lgg0YDQsNC30LzQtdGA0L7QsiDQstC70L7QttC10L3QvdC+0LPQviDQvNCw0LrQtdGC0LAuXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvSUJhbGxvb25MYXlvdXQueG1sI2V2ZW50LXVzZXJjbG9zZVxuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBuYW1lIG9uU3VibGF5b3V0U2l6ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG9uU3VibGF5b3V0U2l6ZUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBNeUJhbGxvb25MYXlvdXQuc3VwZXJjbGFzcy5vblN1YmxheW91dFNpemVDaGFuZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5faXNFbGVtZW50KHRoaXMuXyRlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUVsZW1lbnRPZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5maXJlKCdzaGFwZWNoYW5nZScpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQodC00LLQuNCz0LDQtdC8INCx0LDQu9GD0L0sINGH0YLQvtCx0YsgXCLRhdCy0L7RgdGC0LjQulwiINGD0LrQsNC30YvQstCw0Lsg0L3QsCDRgtC+0YfQutGDINC/0YDQuNCy0Y/Qt9C60LguXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvSUJhbGxvb25MYXlvdXQueG1sI2V2ZW50LXVzZXJjbG9zZVxuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBuYW1lIGFwcGx5RWxlbWVudE9mZnNldFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFwcGx5RWxlbWVudE9mZnNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogLSh0aGlzLl8kZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtKHRoaXMuXyRlbGVtZW50WzBdLm9mZnNldEhlaWdodCArIHRoaXMuXyRlbGVtZW50LmZpbmQoJy5hcnJvdycpWzBdLm9mZnNldEhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCX0LDQutGA0YvQstCw0LXRgiDQsdCw0LvRg9C9INC/0YDQuCDQutC70LjQutC1INC90LAg0LrRgNC10YHRgtC40LosINC60LjQtNCw0Y8g0YHQvtCx0YvRgtC40LUgXCJ1c2VyY2xvc2VcIiDQvdCwINC80LDQutC10YLQtS5cbiAgICAgICAgICAgICAgICAgKiBAc2VlIGh0dHBzOi8vYXBpLnlhbmRleC5ydS9tYXBzL2RvYy9qc2FwaS8yLjEvcmVmL3JlZmVyZW5jZS9JQmFsbG9vbkxheW91dC54bWwjZXZlbnQtdXNlcmNsb3NlXG4gICAgICAgICAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICogQG5hbWUgb25DbG9zZUNsaWNrXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgb25DbG9zZUNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuZmlyZSgndXNlcmNsb3NlJyk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0LDQstGC0L7Qv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNC90LjRjyAoYmFsbG9vbkF1dG9QYW4pLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cHM6Ly9hcGkueWFuZGV4LnJ1L21hcHMvZG9jL2pzYXBpLzIuMS9yZWYvcmVmZXJlbmNlL0lMYXlvdXQueG1sI2dldENsaWVudEJvdW5kc1xuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBuYW1lIGdldENsaWVudEJvdW5kc1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJbXVtdfSDQmtC+0L7RgNC00LjQvdCw0YLRiyDQu9C10LLQvtCz0L4g0LLQtdGA0YXQvdC10LPQviDQuCDQv9GA0LDQstC+0LPQviDQvdC40LbQvdC10LPQviDRg9Cz0LvQvtCyINGI0LDQsdC70L7QvdCwINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDRgtC+0YfQutC4INC/0YDQuNCy0Y/Qt9C60LguXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgLy8gZ2V0U2hhcGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoIXRoaXMuX2lzRWxlbWVudCh0aGlzLl8kZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBNeUJhbGxvb25MYXlvdXQuc3VwZXJjbGFzcy5nZXRTaGFwZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy5fJGVsZW1lbnQucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gbmV3IHltYXBzLnNoYXBlLlJlY3RhbmdsZShuZXcgeW1hcHMuZ2VvbWV0cnkucGl4ZWwuUmVjdGFuZ2xlKFtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIFtwb3NpdGlvbi5sZWZ0LCBwb3NpdGlvbi50b3BdLCBbXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcG9zaXRpb24ubGVmdCArIHRoaXMuXyRlbGVtZW50WzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHBvc2l0aW9uLnRvcCArIHRoaXMuXyRlbGVtZW50WzBdLm9mZnNldEhlaWdodCArIHRoaXMuXyRlbGVtZW50LmZpbmQoJy5hcnJvdycpWzBdLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgXVxuICAgICAgICAgICAgICAgIC8vICAgICBdKSk7XG4gICAgICAgICAgICAgICAgLy8gfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCf0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LjQtSDRjdC70LXQvNC10L3RgtCwICjQsiDQmNCVINC4INCe0L/QtdGA0LUg0LXQs9C+INC10YnQtSDQvNC+0LbQtdGCINC90LUg0LHRi9GC0YwpLlxuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICogQG5hbWUgX2lzRWxlbWVudFxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7alF1ZXJ5fSBbZWxlbWVudF0g0K3Qu9C10LzQtdC90YIuXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59INCk0LvQsNCzINC90LDQu9C40YfQuNGPLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIF9pc0VsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnRbMF0gJiYgZWxlbWVudC5maW5kKCcuYXJyb3cnKVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAvLyDQodC+0LfQtNCw0L3QuNC1INCy0LvQvtC20LXQvdC90L7Qs9C+INC80LDQutC10YLQsCDRgdC+0LTQtdGA0LbQuNC80L7Qs9C+INCx0LDQu9GD0L3QsC5cbiAgICAgICAgTXlCYWxsb29uQ29udGVudExheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcbiAgICAgICAgICAgICc8aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+JFtwcm9wZXJ0aWVzLmJhbGxvb25IZWFkZXJdPC9oMz4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPiRbcHJvcGVydGllcy5iYWxsb29uQ29udGVudF08L2Rpdj4nXG4gICAgICAgICksXG5cbiAgICAgICAgLy8g0KHQvtC30LTQsNC90LjQtSDQvNC10YLQutC4INGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC8INC80LDQutC10YLQvtC8INCx0LDQu9GD0L3QsC5cbiAgICAgICAgbXlQbGFjZW1hcmsgPSB3aW5kb3cubXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKG15TWFwLmdldENlbnRlcigpLCB7XG4gICAgICAgICAgICBiYWxsb29uSGVhZGVyOiAn0KbQtdC90YLRgCDRgdC70YPRhSDQvdCwINGD0LsuINCc0LDQutCw0YLQsNC10LLQsCwgMTgnLFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICc8dWw+PGxpPjxzcGFuPtCQ0LTRgNC10YE8L3NwYW4+PHNwYW4+OTAwNTI0LCDQkNC70LzQsC3QkNGC0LAsINGD0LsuINCc0LDQutCw0YLQsNC10LLQsCwgMTg8L3NwYW4+PC9saT48bGk+PHNwYW4+0JLRgNC10LzRjyDRgNCw0LHQvtGC0Ys8L3NwYW4+PHNwYW4+0J/QvS3Qn9GCOiA4OjAwLTIwOjAwPGJyPtCS0YvRhdC+0LTQvdGL0LU6INCh0LEsINCS0YE8L3NwYW4+PC9saT48bGk+PHNwYW4+0KLQtdC70LXRhNC+0L08L3NwYW4+PHNwYW4+KzcgKDkwMCkgMjMyLTIzLTIzPC9zcGFuPjwvbGk+PGxpPjxzcGFuPtCt0LvQtdC60YLRgNC+0L3QvdCw0Y8g0L/QvtGH0YLQsDwvc3Bhbj48c3Bhbj5rYXphaHN0YW5AYXVkaW90ZWNoLnJ1PC9zcGFuPjwvbGk+PC91bD4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGJhbGxvb25TaGFkb3c6IGZhbHNlLFxuICAgICAgICAgICAgYmFsbG9vbkxheW91dDogTXlCYWxsb29uTGF5b3V0LFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRMYXlvdXQ6IE15QmFsbG9vbkNvbnRlbnRMYXlvdXQsXG4gICAgICAgICAgICBiYWxsb29uUGFuZWxNYXhNYXBBcmVhOiAwLFxuICAgICAgICAgICAgLy8g0J3QtSDRgdC60YDRi9Cy0LDQtdC8INC40LrQvtC90LrRgyDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQsdCw0LvRg9C90LUuXG4gICAgICAgICAgICBoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxuICAgICAgICAgICAgLy8g0Jgg0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90L4g0YHQvNC10YnQsNC10Lwg0LHQsNC70YPQvSwg0LTQu9GPINC+0YLQutGA0YvRgtC40Y8g0L3QsNC0INC40LrQvtC90LrQvtC5LlxuICAgICAgICAgICAgLy8gYmFsbG9vbk9mZnNldDogWzMsIC00MF1cbiAgICAgICAgICAgIC8vINCd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC00LDQvdC90YvQuSDRgtC40L8g0LzQsNC60LXRgtCwLlxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgLy8g0KHQstC+0ZEg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQuNC60L7QvdC60Lgg0LzQtdGC0LrQuC5cbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvaWNucy9zbS1sb2NhdGlvbi1tYXJrZXIuc3ZnJyxcbiAgICAgICAgICAgIC8vINCg0LDQt9C80LXRgNGLINC80LXRgtC60LguXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzIsIDMyXSxcbiAgICAgICAgICAgIC8vINCh0LzQtdGJ0LXQvdC40LUg0LvQtdCy0L7Qs9C+INCy0LXRgNGF0L3QtdCz0L4g0YPQs9C70LAg0LjQutC+0L3QutC4INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QvlxuICAgICAgICAgICAgLy8g0LXRkSBcItC90L7QttC60LhcIiAo0YLQvtGH0LrQuCDQv9GA0LjQstGP0LfQutC4KS5cbiAgICAgICAgICAgIGhpZGVJY29uT25CYWxsb29uT3BlbjogZmFsc2UsXG4gICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstNSwgLTM4XVxuICAgICAgICB9KSxcbiAgICAgICAgbXlQbGFjZW1hcmsyID0gd2luZG93Lm15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNjc2NzU0LCAzNy44OTMzMjRdLCB7XG4gICAgICAgICAgICBiYWxsb29uSGVhZGVyOiAn0KbQtdC90YLRgCDRgdC70YPRhSDQvdCwINGD0LsuINCc0LDQutCw0YLQsNC10LLQsCwgMTgnLFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICc8dWw+PGxpPjxzcGFuPtCQ0LTRgNC10YE8L3NwYW4+PHNwYW4+OTAwNTI0LCDQkNC70LzQsC3QkNGC0LAsINGD0LsuINCc0LDQutCw0YLQsNC10LLQsCwgMTg8L3NwYW4+PC9saT48bGk+PHNwYW4+0JLRgNC10LzRjyDRgNCw0LHQvtGC0Ys8L3NwYW4+PHNwYW4+0J/QvS3Qn9GCOiA4OjAwLTIwOjAwPGJyPtCS0YvRhdC+0LTQvdGL0LU6INCh0LEsINCS0YE8L3NwYW4+PC9saT48bGk+PHNwYW4+0KLQtdC70LXRhNC+0L08L3NwYW4+PHNwYW4+KzcgKDkwMCkgMjMyLTIzLTIzPC9zcGFuPjwvbGk+PGxpPjxzcGFuPtCt0LvQtdC60YLRgNC+0L3QvdCw0Y8g0L/QvtGH0YLQsDwvc3Bhbj48c3Bhbj5rYXphaHN0YW5AYXVkaW90ZWNoLnJ1PC9zcGFuPjwvbGk+PC91bD4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGJhbGxvb25TaGFkb3c6IGZhbHNlLFxuICAgICAgICAgICAgYmFsbG9vbkxheW91dDogTXlCYWxsb29uTGF5b3V0LFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRMYXlvdXQ6IE15QmFsbG9vbkNvbnRlbnRMYXlvdXQsXG4gICAgICAgICAgICBiYWxsb29uUGFuZWxNYXhNYXBBcmVhOiAwLFxuICAgICAgICAgICAgLy8g0J3QtSDRgdC60YDRi9Cy0LDQtdC8INC40LrQvtC90LrRgyDQv9GA0Lgg0L7RgtC60YDRi9GC0L7QvCDQsdCw0LvRg9C90LUuXG4gICAgICAgICAgICBoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxuICAgICAgICAgICAgLy8g0Jgg0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90L4g0YHQvNC10YnQsNC10Lwg0LHQsNC70YPQvSwg0LTQu9GPINC+0YLQutGA0YvRgtC40Y8g0L3QsNC0INC40LrQvtC90LrQvtC5LlxuICAgICAgICAgICAgLy8gYmFsbG9vbk9mZnNldDogWzMsIC00MF1cbiAgICAgICAgICAgIC8vINCd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC00LDQvdC90YvQuSDRgtC40L8g0LzQsNC60LXRgtCwLlxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgLy8g0KHQstC+0ZEg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQuNC60L7QvdC60Lgg0LzQtdGC0LrQuC5cbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvaWNucy9zbS1sb2NhdGlvbi1tYXJrZXIuc3ZnJyxcbiAgICAgICAgICAgIC8vINCg0LDQt9C80LXRgNGLINC80LXRgtC60LguXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzIsIDMyXSxcbiAgICAgICAgICAgIC8vINCh0LzQtdGJ0LXQvdC40LUg0LvQtdCy0L7Qs9C+INCy0LXRgNGF0L3QtdCz0L4g0YPQs9C70LAg0LjQutC+0L3QutC4INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QvlxuICAgICAgICAgICAgLy8g0LXRkSBcItC90L7QttC60LhcIiAo0YLQvtGH0LrQuCDQv9GA0LjQstGP0LfQutC4KS5cbiAgICAgICAgICAgIGhpZGVJY29uT25CYWxsb29uT3BlbjogZmFsc2UsXG4gICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstNSwgLTM4XVxuICAgICAgICB9KTtcblxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrKSxcbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFyazIpO1xufSk7Il0sImZpbGUiOiJiYWxsb29uX2h0bWwtYWJvdXQuanMifQ==
} catch (e) {
    console.log(e);
}