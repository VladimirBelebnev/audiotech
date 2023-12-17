ymaps.ready(function () {
    // Создание экземпляра карты и его привязка к созданному контейнеру.
    var myMap = new ymaps.Map('map-delivery', {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom'],
            controls: [],
        }),

        // Создание макета балуна на основе Twitter Bootstrap.
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
                '<a class="close" href="#"><img src="img/icns/md-x.svg"></a>' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=220 maxWidth=220 maxHeight=350]]' +
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
            balloonHeader: 'Почтовое отделение 900524',
            balloonContent: '<ul><li><span>Адрес</span><span>900524, Алма-Ата, ул. Богенбай Батыра, 134</span></li><li><span>Время работы</span><span>Пн-Пт: 8:00-20:00<br>Выходные: Сб, Вс</span></li><li><span>Оплата</span><span>карта, наличные</span></li><li class="popover__footer"><span>Доставка</span><span>от 2 дней / 300 ₽</span></li></ul>'
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
            iconImageHref: 'img/icns/sm-location-marker.svg',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            hideIconOnBalloonOpen: false,
            iconImageOffset: [-5, -38]
        }),
        myPlacemark2 = window.myPlacemark = new ymaps.Placemark([55.676754, 37.893324], {
            balloonHeader: 'Почтовое отделение 900524',
            balloonContent: '<ul><li><span>Адрес</span><span>900524, Алма-Ата, ул. Богенбай Батыра, 134</span></li><li><span>Время работы</span><span>Пн-Пт: 8:00-20:00<br>Выходные: Сб, Вс</span></li><li><span>Оплата</span><span>карта, наличные</span></li><li class="popover__footer"><span>Доставка</span><span>от 2 дней / 300 ₽</span></li></ul>'
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
            iconImageHref: 'img/icns/sm-location-marker.svg',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYWxsb29uX2h0bWwtZGVsaXZlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsieW1hcHMucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0Y3QutC30LXQvNC/0LvRj9GA0LAg0LrQsNGA0YLRiyDQuCDQtdCz0L4g0L/RgNC40LLRj9C30LrQsCDQuiDRgdC+0LfQtNCw0L3QvdC+0LzRgyDQutC+0L3RgtC10LnQvdC10YDRgy5cbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdtYXAtZGVsaXZlcnknLCB7XG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43NTE1NzQsIDM3LjU3Mzg1Nl0sXG4gICAgICAgICAgICB6b29tOiA5LFxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbJ2RlZmF1bHQnLCAnc2Nyb2xsWm9vbSddLFxuICAgICAgICAgICAgY29udHJvbHM6IFtdLFxuICAgICAgICB9KSxcblxuICAgICAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC80LDQutC10YLQsCDQsdCw0LvRg9C90LAg0L3QsCDQvtGB0L3QvtCy0LUgVHdpdHRlciBCb290c3RyYXAuXG4gICAgICAgIE15QmFsbG9vbkxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wb3ZlciB0b3BcIj4nICtcbiAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjbG9zZVwiIGhyZWY9XCIjXCI+PGltZyBzcmM9XCJpbWcvaWNucy9tZC14LnN2Z1wiPjwvYT4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWlubmVyXCI+JyArXG4gICAgICAgICAgICAgICAgJyRbW29wdGlvbnMuY29udGVudExheW91dCBvYnNlcnZlU2l6ZSBtaW5XaWR0aD0yMjAgbWF4V2lkdGg9MjIwIG1heEhlaWdodD0zNTBdXScgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+Jywge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCh0YLRgNC+0LjRgiDRjdC60LfQtdC80L/Qu9GP0YAg0LzQsNC60LXRgtCwINC90LAg0L7RgdC90L7QstC1INGI0LDQsdC70L7QvdCwINC4INC00L7QsdCw0LLQu9GP0LXRgiDQtdCz0L4g0LIg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5IEhUTUwt0Y3Qu9C10LzQtdC90YIuXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvbGF5b3V0LnRlbXBsYXRlQmFzZWQuQmFzZS54bWwjYnVpbGRcbiAgICAgICAgICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgKiBAbmFtZSBidWlsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3Iuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50ID0gJCgnLnBvcG92ZXInLCB0aGlzLmdldFBhcmVudEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUVsZW1lbnRPZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5maW5kKCcuY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICQucHJveHkodGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0KPQtNCw0LvRj9C10YIg0YHQvtC00LXRgNC20LjQvNC+0LUg0LzQsNC60LXRgtCwINC40LcgRE9NLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cHM6Ly9hcGkueWFuZGV4LnJ1L21hcHMvZG9jL2pzYXBpLzIuMS9yZWYvcmVmZXJlbmNlL2xheW91dC50ZW1wbGF0ZUJhc2VkLkJhc2UueG1sI2NsZWFyXG4gICAgICAgICAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICogQG5hbWUgY2xlYXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5maW5kKCcuY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZignY2xpY2snKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnN1cGVyY2xhc3MuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0JzQtdGC0L7QtCDQsdGD0LTQtdGCINCy0YvQt9Cy0LDQvSDRgdC40YHRgtC10LzQvtC5INGI0LDQsdC70L7QvdC+0LIg0JDQn9CYINC/0YDQuCDQuNC30LzQtdC90LXQvdC40Lgg0YDQsNC30LzQtdGA0L7QsiDQstC70L7QttC10L3QvdC+0LPQviDQvNCw0LrQtdGC0LAuXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvSUJhbGxvb25MYXlvdXQueG1sI2V2ZW50LXVzZXJjbG9zZVxuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBuYW1lIG9uU3VibGF5b3V0U2l6ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG9uU3VibGF5b3V0U2l6ZUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBNeUJhbGxvb25MYXlvdXQuc3VwZXJjbGFzcy5vblN1YmxheW91dFNpemVDaGFuZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5faXNFbGVtZW50KHRoaXMuXyRlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUVsZW1lbnRPZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5maXJlKCdzaGFwZWNoYW5nZScpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQodC00LLQuNCz0LDQtdC8INCx0LDQu9GD0L0sINGH0YLQvtCx0YsgXCLRhdCy0L7RgdGC0LjQulwiINGD0LrQsNC30YvQstCw0Lsg0L3QsCDRgtC+0YfQutGDINC/0YDQuNCy0Y/Qt9C60LguXG4gICAgICAgICAgICAgICAgICogQHNlZSBodHRwczovL2FwaS55YW5kZXgucnUvbWFwcy9kb2MvanNhcGkvMi4xL3JlZi9yZWZlcmVuY2UvSUJhbGxvb25MYXlvdXQueG1sI2V2ZW50LXVzZXJjbG9zZVxuICAgICAgICAgICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAqIEBuYW1lIGFwcGx5RWxlbWVudE9mZnNldFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFwcGx5RWxlbWVudE9mZnNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kZWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogLSh0aGlzLl8kZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtKHRoaXMuXyRlbGVtZW50WzBdLm9mZnNldEhlaWdodCArIHRoaXMuXyRlbGVtZW50LmZpbmQoJy5hcnJvdycpWzBdLm9mZnNldEhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCX0LDQutGA0YvQstCw0LXRgiDQsdCw0LvRg9C9INC/0YDQuCDQutC70LjQutC1INC90LAg0LrRgNC10YHRgtC40LosINC60LjQtNCw0Y8g0YHQvtCx0YvRgtC40LUgXCJ1c2VyY2xvc2VcIiDQvdCwINC80LDQutC10YLQtS5cbiAgICAgICAgICAgICAgICAgKiBAc2VlIGh0dHBzOi8vYXBpLnlhbmRleC5ydS9tYXBzL2RvYy9qc2FwaS8yLjEvcmVmL3JlZmVyZW5jZS9JQmFsbG9vbkxheW91dC54bWwjZXZlbnQtdXNlcmNsb3NlXG4gICAgICAgICAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICogQG5hbWUgb25DbG9zZUNsaWNrXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgb25DbG9zZUNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLmZpcmUoJ3VzZXJjbG9zZScpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINCw0LLRgtC+0L/QvtC30LjRhtC40L7QvdC40YDQvtCy0LDQvdC40Y8gKGJhbGxvb25BdXRvUGFuKS5cbiAgICAgICAgICAgICAgICAgKiBAc2VlIGh0dHBzOi8vYXBpLnlhbmRleC5ydS9tYXBzL2RvYy9qc2FwaS8yLjEvcmVmL3JlZmVyZW5jZS9JTGF5b3V0LnhtbCNnZXRDbGllbnRCb3VuZHNcbiAgICAgICAgICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgKiBAbmFtZSBnZXRDbGllbnRCb3VuZHNcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyW11bXX0g0JrQvtC+0YDQtNC40L3QsNGC0Ysg0LvQtdCy0L7Qs9C+INCy0LXRgNGF0L3QtdCz0L4g0Lgg0L/RgNCw0LLQvtCz0L4g0L3QuNC20L3QtdCz0L4g0YPQs9C70L7QsiDRiNCw0LHQu9C+0L3QsCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0YLQvtGH0LrQuCDQv9GA0LjQstGP0LfQutC4LlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIC8vIGdldFNoYXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKCF0aGlzLl9pc0VsZW1lbnQodGhpcy5fJGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gTXlCYWxsb29uTGF5b3V0LnN1cGVyY2xhc3MuZ2V0U2hhcGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuXyRlbGVtZW50LnBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyB5bWFwcy5zaGFwZS5SZWN0YW5nbGUobmV3IHltYXBzLmdlb21ldHJ5LnBpeGVsLlJlY3RhbmdsZShbXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBbcG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wXSwgW1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgKyB0aGlzLl8kZWxlbWVudFswXS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBwb3NpdGlvbi50b3AgKyB0aGlzLl8kZWxlbWVudFswXS5vZmZzZXRIZWlnaHQgKyB0aGlzLl8kZWxlbWVudC5maW5kKCcuYXJyb3cnKVswXS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAvLyAgICAgXSkpO1xuICAgICAgICAgICAgICAgIC8vIH0sXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQn9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0Y3Qu9C10LzQtdC90YLQsCAo0LIg0JjQlSDQuCDQntC/0LXRgNC1INC10LPQviDQtdGJ0LUg0LzQvtC20LXRgiDQvdC1INCx0YvRgtGMKS5cbiAgICAgICAgICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqIEBuYW1lIF9pc0VsZW1lbnRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2pRdWVyeX0gW2VsZW1lbnRdINCt0LvQtdC80LXQvdGCLlxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtCb29sZWFufSDQpNC70LDQsyDQvdCw0LvQuNGH0LjRjy5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBfaXNFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50WzBdICYmIGVsZW1lbnQuZmluZCgnLmFycm93JylbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG5cbiAgICAgICAgLy8g0KHQvtC30LTQsNC90LjQtSDQstC70L7QttC10L3QvdC+0LPQviDQvNCw0LrQtdGC0LAg0YHQvtC00LXRgNC20LjQvNC+0LPQviDQsdCw0LvRg9C90LAuXG4gICAgICAgIE15QmFsbG9vbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXG4gICAgICAgICAgICAnPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPiRbcHJvcGVydGllcy5iYWxsb29uSGVhZGVyXTwvaDM+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj4kW3Byb3BlcnRpZXMuYmFsbG9vbkNvbnRlbnRdPC9kaXY+J1xuICAgICAgICApLFxuXG4gICAgICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LzQtdGC0LrQuCDRgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQvCDQvNCw0LrQtdGC0L7QvCDQsdCw0LvRg9C90LAuXG4gICAgICAgIG15UGxhY2VtYXJrID0gd2luZG93Lm15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhteU1hcC5nZXRDZW50ZXIoKSwge1xuICAgICAgICAgICAgYmFsbG9vbkhlYWRlcjogJ9Cf0L7Rh9GC0L7QstC+0LUg0L7RgtC00LXQu9C10L3QuNC1IDkwMDUyNCcsXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudDogJzx1bD48bGk+PHNwYW4+0JDQtNGA0LXRgTwvc3Bhbj48c3Bhbj45MDA1MjQsINCQ0LvQvNCwLdCQ0YLQsCwg0YPQuy4g0JHQvtCz0LXQvdCx0LDQuSDQkdCw0YLRi9GA0LAsIDEzNDwvc3Bhbj48L2xpPjxsaT48c3Bhbj7QktGA0LXQvNGPINGA0LDQsdC+0YLRizwvc3Bhbj48c3Bhbj7Qn9C9LdCf0YI6IDg6MDAtMjA6MDA8YnI+0JLRi9GF0L7QtNC90YvQtTog0KHQsSwg0JLRgTwvc3Bhbj48L2xpPjxsaT48c3Bhbj7QntC/0LvQsNGC0LA8L3NwYW4+PHNwYW4+0LrQsNGA0YLQsCwg0L3QsNC70LjRh9C90YvQtTwvc3Bhbj48L2xpPjxsaSBjbGFzcz1cInBvcG92ZXJfX2Zvb3RlclwiPjxzcGFuPtCU0L7RgdGC0LDQstC60LA8L3NwYW4+PHNwYW4+0L7RgiAyINC00L3QtdC5IC8gMzAwIOKCvTwvc3Bhbj48L2xpPjwvdWw+J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiYWxsb29uU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgIGJhbGxvb25MYXlvdXQ6IE15QmFsbG9vbkxheW91dCxcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50TGF5b3V0OiBNeUJhbGxvb25Db250ZW50TGF5b3V0LFxuICAgICAgICAgICAgYmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcbiAgICAgICAgICAgIC8vINCd0LUg0YHQutGA0YvQstCw0LXQvCDQuNC60L7QvdC60YMg0L/RgNC4INC+0YLQutGA0YvRgtC+0Lwg0LHQsNC70YPQvdC1LlxuICAgICAgICAgICAgaGlkZUljb25PbkJhbGxvb25PcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vINCYINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdC+INGB0LzQtdGJ0LDQtdC8INCx0LDQu9GD0L0sINC00LvRjyDQvtGC0LrRgNGL0YLQuNGPINC90LDQtCDQuNC60L7QvdC60L7QuS5cbiAgICAgICAgICAgIC8vIGJhbGxvb25PZmZzZXQ6IFszLCAtNDBdXG4gICAgICAgICAgICAvLyDQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQtNCw0L3QvdGL0Lkg0YLQuNC/INC80LDQutC10YLQsC5cbiAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgIC8vINCh0LLQvtGRINC40LfQvtCx0YDQsNC20LXQvdC40LUg0LjQutC+0L3QutC4INC80LXRgtC60LguXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2ljbnMvc20tbG9jYXRpb24tbWFya2VyLnN2ZycsXG4gICAgICAgICAgICAvLyDQoNCw0LfQvNC10YDRiyDQvNC10YLQutC4LlxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMyLCAzMl0sXG4gICAgICAgICAgICAvLyDQodC80LXRidC10L3QuNC1INC70LXQstC+0LPQviDQstC10YDRhdC90LXQs9C+INGD0LPQu9CwINC40LrQvtC90LrQuCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L5cbiAgICAgICAgICAgIC8vINC10ZEgXCLQvdC+0LbQutC4XCIgKNGC0L7Rh9C60Lgg0L/RgNC40LLRj9C30LrQuCkuXG4gICAgICAgICAgICBoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTUsIC0zOF1cbiAgICAgICAgfSksXG4gICAgICAgIG15UGxhY2VtYXJrMiA9IHdpbmRvdy5teVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1LjY3Njc1NCwgMzcuODkzMzI0XSwge1xuICAgICAgICAgICAgYmFsbG9vbkhlYWRlcjogJ9Cf0L7Rh9GC0L7QstC+0LUg0L7RgtC00LXQu9C10L3QuNC1IDkwMDUyNCcsXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudDogJzx1bD48bGk+PHNwYW4+0JDQtNGA0LXRgTwvc3Bhbj48c3Bhbj45MDA1MjQsINCQ0LvQvNCwLdCQ0YLQsCwg0YPQuy4g0JHQvtCz0LXQvdCx0LDQuSDQkdCw0YLRi9GA0LAsIDEzNDwvc3Bhbj48L2xpPjxsaT48c3Bhbj7QktGA0LXQvNGPINGA0LDQsdC+0YLRizwvc3Bhbj48c3Bhbj7Qn9C9LdCf0YI6IDg6MDAtMjA6MDA8YnI+0JLRi9GF0L7QtNC90YvQtTog0KHQsSwg0JLRgTwvc3Bhbj48L2xpPjxsaT48c3Bhbj7QntC/0LvQsNGC0LA8L3NwYW4+PHNwYW4+0LrQsNGA0YLQsCwg0L3QsNC70LjRh9C90YvQtTwvc3Bhbj48L2xpPjxsaSBjbGFzcz1cInBvcG92ZXJfX2Zvb3RlclwiPjxzcGFuPtCU0L7RgdGC0LDQstC60LA8L3NwYW4+PHNwYW4+0L7RgiAyINC00L3QtdC5IC8gMzAwIOKCvTwvc3Bhbj48L2xpPjwvdWw+J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiYWxsb29uU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgIGJhbGxvb25MYXlvdXQ6IE15QmFsbG9vbkxheW91dCxcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50TGF5b3V0OiBNeUJhbGxvb25Db250ZW50TGF5b3V0LFxuICAgICAgICAgICAgYmFsbG9vblBhbmVsTWF4TWFwQXJlYTogMCxcbiAgICAgICAgICAgIC8vINCd0LUg0YHQutGA0YvQstCw0LXQvCDQuNC60L7QvdC60YMg0L/RgNC4INC+0YLQutGA0YvRgtC+0Lwg0LHQsNC70YPQvdC1LlxuICAgICAgICAgICAgaGlkZUljb25PbkJhbGxvb25PcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vINCYINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdC+INGB0LzQtdGJ0LDQtdC8INCx0LDQu9GD0L0sINC00LvRjyDQvtGC0LrRgNGL0YLQuNGPINC90LDQtCDQuNC60L7QvdC60L7QuS5cbiAgICAgICAgICAgIC8vIGJhbGxvb25PZmZzZXQ6IFszLCAtNDBdXG4gICAgICAgICAgICAvLyDQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQtNCw0L3QvdGL0Lkg0YLQuNC/INC80LDQutC10YLQsC5cbiAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgIC8vINCh0LLQvtGRINC40LfQvtCx0YDQsNC20LXQvdC40LUg0LjQutC+0L3QutC4INC80LXRgtC60LguXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2ljbnMvc20tbG9jYXRpb24tbWFya2VyLnN2ZycsXG4gICAgICAgICAgICAvLyDQoNCw0LfQvNC10YDRiyDQvNC10YLQutC4LlxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMyLCAzMl0sXG4gICAgICAgICAgICAvLyDQodC80LXRidC10L3QuNC1INC70LXQstC+0LPQviDQstC10YDRhdC90LXQs9C+INGD0LPQu9CwINC40LrQvtC90LrQuCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L5cbiAgICAgICAgICAgIC8vINC10ZEgXCLQvdC+0LbQutC4XCIgKNGC0L7Rh9C60Lgg0L/RgNC40LLRj9C30LrQuCkuXG4gICAgICAgICAgICBoaWRlSWNvbk9uQmFsbG9vbk9wZW46IGZhbHNlLFxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTUsIC0zOF1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspLFxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrMik7XG59KTsiXSwiZmlsZSI6ImJhbGxvb25faHRtbC1kZWxpdmVyeS5qcyJ9
