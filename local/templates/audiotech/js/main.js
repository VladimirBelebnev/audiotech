document.addEventListener("DOMContentLoaded", function () {
    const minViewPort = (min = 300) => {
        if (window.innerWidth <= min) {
            const viewport = document.querySelector('[name="viewport"]');
            if (viewport)
                viewport.setAttribute("content", `width=${min}, user-scalable=no`);
        }
    };

    minViewPort();

    // custom select
    customSelect('.mySelect');
    const cstSel = document.querySelector('.mySelect').customSelect

    const mySelectPriem = document.querySelector('.mySelectPriem');
    const arrAirPicker = document.querySelectorAll('.airPicker');

    mySelectPriem.addEventListener('change', function () {
        if (mySelectPriem.value !== 'default') {
            arrAirPicker.forEach(picker => {
                picker.removeAttribute('disabled');
            })
        } else {
            arrAirPicker.forEach(picker => {
                picker.setAttribute('disabled', 'disabled');
            })
        }
    });
    // custom select

    new AirDatepicker('#airpicker', {
        onSelect: function (dateText, inst) {
            showTimes();
        }
    });

    new AirDatepicker('#airpicker2', {
        onSelect: function (dateText, inst) {
            showTimes();
        }
    });

    new AirDatepicker('#airpicker3', {
        onSelect: function (dateText, inst) {
            showTimes();
        }
    });

    const showTimes = function () {
        document.querySelector('.modal__times-wrap').classList.remove('hidden');
    }

    // header stiky
    window.onscroll = function () {
        myFunction()
    };
    const header = document.querySelector("header");
    const headerBottom = document.querySelector('.header-bottom');
    const sticky = headerBottom.offsetTop;
    const headerHeight = headerBottom.clientHeight;
    const menuFullScreen = document.querySelector('.main-nav__submenu-wrap--full-screen')

    menuFullScreen.style.top = header.clientHeight - 2 + 'px';

    function myFunction() {
        if (window.scrollY > sticky && window.innerWidth > 940) {
            headerBottom.classList.add("sticky");
            document.querySelector('main').style.paddingTop = headerHeight + 'px';
        } if (window.innerWidth > 1024) {
            menuFullScreen.style.top = headerHeight - 1 + 'px';
        } if (window.scrollY < sticky && window.innerWidth > 940) {
            headerBottom.classList.remove("sticky");
            menuFullScreen.style.top = header.clientHeight - 2 + 'px';
            document.querySelector('main').style.paddingTop = '0px';
        }
    }


    if (window.innerWidth <= 940) {
        headerBottom.classList.add("sticky");
        document.querySelector('main').style.paddingTop = headerHeight + 'px';
    }
    // header stiky


    const modals = document.querySelectorAll('.modal-wrap');
    modals.forEach(modal => {
        document.addEventListener('click', e => {
            if (!e.target.closest('.modal') && !e.target.closest('.air-datepicker') && !e.target.classList.contains('air-datepicker-cell')) {
                modal.classList.remove('active');
                overlay.classList.remove('active');
                scrollLock.enablePageScroll();
                document.querySelector("body").style.overflow = "";
            }
        })
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 27) {
                modal.classList.remove('active');
                overlay.classList.remove('active');
                document.querySelector('body').style.overflow = "";
            }
        });
    })

    const burgerBtn = document.querySelector(".burger");
    const mainNav = document.querySelector(".main-nav");
    burgerBtn.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle('active');
        mainNav.classList.toggle("active");
        mainNav.classList.contains('active')
        ? document.querySelector('body').classList.add('hidden') : document.querySelector('body').classList.remove('hidden');
    });


    const showFilter = function () {
        const btnShowFilter = document.querySelector("#showFilter");
        const filterWindow = document.querySelector(".filter");
        if (btnShowFilter !== null) {
            btnShowFilter.addEventListener("click", function () {
                filterWindow.classList.add("active");
                document.body.style = "overflow: hidden";
            });
        }
    };

    showFilter();

    // modal
    const overlay = document.querySelector("#overlay");
    const btnSubmitReg = document.querySelector('.modal__reg .btn');

    const hiddenModalAccept = function () {
        setTimeout(() => modalAccept.classList.remove('active'), 3000)
        setTimeout(() => overlay.classList.remove('active'), 3000)
    }

    const submitReg = function (func) {
        btnSubmitReg.addEventListener('click', function (e) {
            e.preventDefault();
            modalReg.classList.remove('active');
            modalAccept.classList.add('active');
            func();
        })
    }

    submitReg(hiddenModalAccept);


    const modalsopen = function () {

        document.addEventListener('click', function (e) {
            if (e.target.dataset.target === 'modal-reg' || e.target.closest('a[data-target="modal-reg"]')) {
                e.preventDefault();
                document.querySelector('body').style.overflow = "hidden";

                document.querySelector('#modalReg').classList.add('active');

                overlay.classList.add('active');
                if (e.target.closest('.doctors__item')) {
                    let name = e.target.closest('.doctors__item').querySelector('.doctors__name').textContent;
                    document.querySelector('#nameDoctor').value = name;
                } else if (document.querySelector('#inputDoc')) {
                    document.querySelector('#inputDoc').remove();
                }


            } else if (e.target.dataset.target === 'modal-call') {
                e.preventDefault();
                scrollLock.enablePageScroll();
                document.querySelector('#modalCall').classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = "hidden";
            } else if (e.target.dataset.close === 'modal') {
                e.preventDefault();
                document.querySelector('body').style.overflow = "";
                e.target.closest('.modal-wrap').classList.remove('active');
                overlay.classList.remove('active');
            }
        });

    }
    modalsopen();

    const modals4 = document.querySelectorAll('.modal');
    modals4.forEach(modal => {
        const close = modal.querySelector('.close-window');
        if (close) {
            close.addEventListener('click', function () {
                if (window.innerWidth < 701) {
                    close.closest('.modal-wrap').scrollTo(100, 0);
                }
            })
        }
    })

    // modal

    // tabs
    if (document.querySelectorAll('.tabs').length > 0) {
        new ItcTabs('.tabs');
    }

    // favorite
    if (document.querySelectorAll('.btn-favorite').length > 0) {
        const btnsFavorite = document.querySelectorAll('.btn-favorite');
        btnsFavorite.forEach(btn => {
            btn.addEventListener('click', function () {
                if (btn.classList.contains('active')) {
                    btn.querySelector('span').innerHTML = "Добавить в избранное";
                } else {
                    btn.querySelector('span').innerHTML = "Добавлено в избранное";
                }
                btn.classList.toggle('active');
            })
        })
    }
    // favorite

    // counter
    const counters = document.querySelectorAll('[data-counter]');
    if (counters) {
        counters.forEach(counter => {
            counter.addEventListener('click', e => {
                const target = e.target;
                if (target.closest('.counter__btn')) {
                    let value = parseInt(target.closest('.counter').querySelector('input').value);
                    if (target.closest('.counter__btn--plus')) {
                        value++;
                    } else {
                        --value;
                    }
                    if (value <= 0) {
                        value = 1;
                        target.closest('.counter').querySelector('.counter__btn--minus').classList.add('disabled');
                    } else {
                        target.closest('.counter').querySelector('.counter__btn--minus').classList.remove('disabled');
                    } target.closest('.counter').querySelector('input').value = value;
                }
            })
        })
    }
    // counter

    // add basket
    document.addEventListener('click', e => {
        target = e.target;
        if (target.classList.contains('addInBasket')) {
            target.remove();
            document.querySelector('.counter').classList.add('show');
        }
    })

    if (document.querySelectorAll('.basket__items').length > 0) {
        document.querySelector('.basket__items').addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.basket__remove-item')) {
                target.closest('.basket__item').remove();
            }
        })
    }
    // add basket

    if (document.querySelectorAll('.filter').length > 0) {
        document.querySelector('.filter').addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.close-filter')) {
                target.closest('.filter').classList.remove('active');
                document.body.style = "overflow: ";
            }
        })
    }

    const btnsLink = document.querySelectorAll('.main-nav__link');
    btnsLink.forEach(item => {
        item.addEventListener('click', function () {
            item.classList.toggle('active');
            item.nextElementSibling.classList.toggle('active');
        })
    })

    const btnsTitle = document.querySelectorAll('.main-submenu__title');
    btnsTitle.forEach(item => {
        item.addEventListener('click', function () {
            item.classList.toggle('active');
            item.nextElementSibling.classList.toggle('show');
        })
    })

    if (window.innerWidth < 1025) {
        // mainNav.style.height = `calc(${document.body.clientHeight}px - ${headerHeight}px)`;
        mainNav.style.height = `calc(100% - ${headerHeight}px)`;
    }

    const favoriteChoose = function () {
        favoriteIcns = document.querySelectorAll('.btn-icn__favorite');
        favoriteIcns.forEach(item => {
            item.addEventListener('click', function () {
                item.classList.toggle('active');
            })
        })
    }
    favoriteChoose();

    const hideChecks = function () {
        const btns = document.querySelectorAll('.filter__all');
        btns.forEach(btn => {
            const wrap = btn.closest('.filter-box');
            const items = wrap.querySelectorAll('.filter-box__item');

            items.forEach((item, i) => {
                if (i > 4) {
                    item.classList.add('hidden');
                }
            })

            btn.addEventListener('click', function () {
                items.forEach((item, i) => {
                    if (i > 4) {
                        if (item.classList.contains('hidden')) {
                            item.classList.remove('hidden');
                            btn.innerHTML = 'Свернуть';
                        } else {
                            item.classList.add('hidden');
                            btn.innerHTML = 'Показать все';
                        }
                    }
                })
            })
        })
    }
    hideChecks();


    const fShowPicProduct = function () {
        document.querySelectorAll('.product__slider .product__preview').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                if (!(e.target.closest('.play-video'))) {
                    scrollLock.disablePageScroll();
                    document.querySelector('.product__slider2').classList.add('active');
                }
            })
        })
    }
    fShowPicProduct();

    const btnPlay = document.querySelectorAll('.btn-play');
    const fPlayVideo = function () {
        const videoWrap = document.querySelector('.video-wrap');
        const btnStop = document.querySelector('.stop-video');
        const video = document.querySelector('#video');
        const src = video.getAttribute('src');
        btnPlay.forEach(play => {
            play.addEventListener('click', function (e) {
                e.preventDefault();
                videoWrap.classList.add('active');
                video.setAttribute('src', src + '&autoplay=1');
                scrollLock.enablePageScroll();
                document.querySelector('.product__slider2').classList.remove('active');
            });
        })
        btnStop.addEventListener('click', function () {
            videoWrap.classList.remove('active');
            video.setAttribute('src', src + '&autoplay=0');
        });
    }

    if (btnPlay.length > 0) {
        fPlayVideo();
    }

    const fHiddenPicProduct = function () {
        document.querySelector('#close-product-pic').addEventListener('click', function (e) {
            e.stopPropagation();
            scrollLock.enablePageScroll();
            document.querySelector('.product__slider2').classList.remove('active');
        });
    }
    if (document.querySelectorAll('#close-product-pic').length > 0) {
        fHiddenPicProduct();
    }

    //chips
    const chipsBtns = document.querySelectorAll('.chips__item');
    chipsBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            chipsBtns.forEach(item => {
                item.classList.remove('active');
            })
            if (e.target.classList.contains('chips__item')) {
                e.target.classList.toggle('active');
            }

        })
    })

    // tooltip
    tippy('#tip', {
        content: '<div class="tooltip__title">В стоимость входит:</div><ul class="tooltip__list"><li>Корпус</li><li>Крышка</li><li>Держатель элемента питания</li><li>Переход</li><li>Регуляторы настройки</li><li>Стандартный ушной вкладыш</li></ul>',
        allowHTML: true,
        placement: 'bottom',
    });

    // showHiddenText
    const showHiddenText = function () {
        const btnsShow = document.querySelectorAll('.show-text');
        btnsShow.forEach(btn => {
            btn.addEventListener('click', function () {
                if (btn.closest('.tabs__par').querySelector('p').classList.contains('hidden-text')) {
                    btn.closest('.tabs__par').querySelector('p').classList.remove('hidden-text'), btn.innerHTML = 'свернуть';
                } else {
                    btn.closest('.tabs__par').querySelector('p').classList.add('hidden-text'), btn.innerHTML = 'Показать все';
                }

            });
        })
    }
    if (document.querySelectorAll('.show-text').length > 0) {
        showHiddenText();
    }

    // breadcrumbs adaptive
    if (window.innerWidth < 700 && document.querySelectorAll('.breadcrumb li').length > 2) {
        const breadcrumbs = document.querySelectorAll('.breadcrumb li');
        breadcrumbs.forEach((item, i) => {
            if (i == breadcrumbs.length - 1 || i < breadcrumbs.length - 3) {
                item.remove();
            }
        })
    }

    if (document.querySelectorAll('.product__slider2').length > 0) {
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 27) {
                document.querySelector('.product__slider2').classList.remove('active');
                scrollLock.enablePageScroll();
            }
        });
    }


    const moveEl = function () {
        const newElement = document.querySelector('.about .subscribe');
        const parentElement = document.querySelector('.about .news');
        let referenceElement;
        if (window.innerWidth > 940) {
            referenceElement = document.querySelector('.article-preview:nth-child(5)');
        } else if (window.innerWidth <= 940 && window.innerWidth > 700) {
            referenceElement = document.querySelector('.article-preview:nth-child(4)');
        }
        parentElement.insertBefore(newElement, referenceElement);
    }
    if (document.querySelectorAll('.about .subscribe').length > 0) {
        moveEl();
    }

    const posModalReg = function () {
        const headerTopHeight = document.querySelector('.header-top').clientHeight;
        const modalReg = document.querySelector('.modal__reg');
        if (window.innerWidth > 940) {
            modalReg.style.top = headerTopHeight + 'px';
        } else {
            modalReg.style.top = headerHeight + 'px';
        }
    }
    posModalReg();


    const myFancy = function () {
        const licenseOverlay = document.querySelector('.license-overlay');
        const items = document.querySelectorAll('.licenses__link');
        const itemFull = document.querySelector('#license-full');
        const close = document.querySelector('#close-license');
        items.forEach(item => {
            let href = item.getAttribute('href');
            item.addEventListener('click', function (e) {
                e.preventDefault();
                licenseOverlay.classList.add('active');
                itemFull.setAttribute('src', href);
            });
        })
        close.addEventListener('click', function () {
            licenseOverlay.classList.remove('active')
        });
        licenseOverlay.addEventListener('click', function (e) {
            if (!(e.target.closest('.license-overlay__wrap'))) {
                licenseOverlay.classList.remove('active')
            }
        });
    }
    if (document.querySelectorAll('.license-overlay').length > 0) {
        myFancy();
    }

    const addToBasket = () => {
        const basketItemsCountSelectors = document.querySelectorAll('.header-basket__count');

        try {
            const btns = document.querySelectorAll('.card .btn');

            btns.forEach(btn => {
               btn.addEventListener('click', () => {
                   let id = btn.dataset.id;
                   let quantity = btn.dataset.quantity;

                   $.ajax({
                       url: '/ajax/addToBasket.php',
                       data: {
                           id: id,
                           quantity: quantity
                       },
                       method: 'POST',
                       dataType: 'HTML',
                       success: function(result){
                           if (result === 'ok') {
                               alert('Товар добавлен в корзину');

                               basketItemsCountSelectors.forEach(basketItemsCount => {
                                   basketItemsCount.style.display = 'flex';
                                   basketItemsCount.innerHTML = +basketItemsCount.innerHTML + 1;
                               });
                           }
                       },
                   });
               });
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const btn = document.querySelector('.addInBasket');

            btn.addEventListener('click', () => {
                let id = btn.dataset.id;
                let quantity = btn.dataset.quantity;

                $.ajax({
                    url: '/ajax/addToBasket.php',
                    data: {
                        id: id,
                        quantity: quantity
                    },
                    method: 'POST',
                    dataType: 'HTML',
                    success: function(result){
                        if (result === 'ok') {
                            alert('Товар добавлен в корзину');

                            basketItemsCountSelectors.forEach(basketItemsCount => {
                                basketItemsCount.style.display = 'flex';
                                basketItemsCount.innerHTML = +basketItemsCount.innerHTML + 1;
                            });
                        }
                    },
                });
            });
        } catch (error) {
            console.log(error);
        }

        try {
            basketItemsCountSelectors.forEach(basketItemsCount => {
                if (basketItemsCount.innerHTML === '0') {
                    basketItemsCount.style.display = 'none';
                }
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const btns = document.querySelectorAll('.counter__btn')
            const counter = document.querySelector('.counter__input--product input');

            btns.forEach(btn => {
               btn.addEventListener('click', () => {
                   let id = counter.dataset.id;
                   let quantity = counter.value;
                   let event = btn.classList.contains('counter__btn--plus') ? 1 : -1;

                   $.ajax({
                       url: '/ajax/addToBasket.php',
                       data: {
                           id: id,
                           quantity: quantity,
                           event: event
                       },
                       method: 'POST',
                       dataType: 'HTML',
                       success: function(result){
                           if (result === 'ok') {}
                       },
                   });
               });
            });
        } catch (error) {
            console.log(error);
        }
    };

    addToBasket();
});