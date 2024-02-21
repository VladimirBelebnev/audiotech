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

    new AirDatepicker('#airpicker4', {
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
        }
        if (window.innerWidth > 1024) {
            menuFullScreen.style.top = headerHeight - 1 + 'px';
        }
        if (window.scrollY < sticky && window.innerWidth > 940) {
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

    document.addEventListener('click', e => {
        if (!e.target.closest('.modal') && !e.target.closest('.air-datepicker') && !e.target.classList.contains('air-datepicker-cell') && !e.target.closest('.register') && !e.target.closest('.entry') && !e.target.closest('.forgot')) {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            overlay.classList.remove('active');
            scrollLock.enablePageScroll();
            document.querySelector("body").style.overflow = "";
            window.location.hash = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) {
            modals.forEach(modal => {
                modal.classList.remove('active');
            })
            overlay.classList.remove('active');
            document.querySelector('body').style.overflow = "";
            window.location.hash = '';
        }
    });


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
                window.location.hash = '';
                if (window.innerWidth < 701) {
                    close.closest('.modal-wrap').scrollTo(100, 0);
                }
            })
        }
    })

    // modal

    // tabs
    if (document.querySelectorAll('.tabs').length > 0) {
        try {
            new ItcTabs('.tabs');
        } catch (error) {
            console.log(error);
        }
    }

    // favorite
    if (document.querySelectorAll('.btn-favorite').length > 0) {
        const btnsFavorite = document.querySelectorAll('.btn-favorite');
        btnsFavorite.forEach(btn => {
            btn.addEventListener('click', function () {
                if (btn.classList.contains('active')) {
                    btn.querySelector('span').innerHTML = "Добавить в избранное";
                    btn.addEventListener('click', deleteFavorite(btn.dataset.id));
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
                        value = 0;
                        target.closest('.counter').querySelector('.counter__btn--minus').classList.add('disabled');
                    } else {
                        target.closest('.counter').querySelector('.counter__btn--minus').classList.remove('disabled');
                    }
                    target.closest('.counter').querySelector('input').value = value;
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

    const btnsItem = document.querySelectorAll('.main-nav__item ');

    btnsItem.forEach(item => {
        const arrow = item.querySelector('.link__arrow');
        const link = item.querySelector('.main-nav__link');

        arrow?.addEventListener('click', function (event) {
            item.classList.toggle('active');
            link.nextElementSibling.classList.toggle('active');
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
            referenceElement = document.querySelector('.article-preview:nth-child(4)');
        } else if (window.innerWidth <= 940 && window.innerWidth > 700) {
            referenceElement = document.querySelector('.article-preview:nth-child()');
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

    let isAdd = false;
    let prevValue = 0;

    const addToBasket = () => {
        const basketItemsCountSelectors = document.querySelectorAll('.header-basket__count.cart');

        try {
            const btns = document.querySelectorAll('.card .btn');

            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    let id = btn.dataset.id;
                    let quantity = btn.dataset.quantity;

                    $.ajax({
                        type: 'POST',
                        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                        url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.add',
                        data: {
                            iProductID: id,
                            iQuantity: quantity
                        },
                        success: function (response) {
                            basketItemsCountSelectors.forEach(basketItemsCount => {
                                basketItemsCount.style.display = 'flex';
                                basketItemsCount.innerHTML = +basketItemsCount.innerHTML + 1;
                            });

                            if (btn?.dataset.reload === 'true') window.location.reload();
                        }
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
                    type: 'POST',
                    headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                    url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.add',
                    data: {
                        iProductID: id,
                        iQuantity: quantity
                    },
                    success: function (response) {
                        basketItemsCountSelectors.forEach(basketItemsCount => {
                            basketItemsCount.style.display = 'flex';
                            basketItemsCount.innerHTML = +basketItemsCount.innerHTML + 1;
                        });
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
            const counter = document.querySelector('.counter__input input');

            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    let id = counter.dataset.id;
                    let quantity = +counter.value + (btn.classList.contains('counter__btn--plus') ? 1 : -1);

                    $.ajax({
                        type: 'POST',
                        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                        url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.add',
                        data: {
                            iProductID: id,
                            iQuantity: +quantity,
                        },
                        success: function (response) {
                            basketItemsCountSelectors.forEach(basketItemsCount => {
                                if (!btn.classList.contains('counter__btn--plus') && +counter.value == 0) deleteFromCart(id);
                                basketItemsCount.style.display = 'flex';
                                if (!isAdd) {
                                    basketItemsCount.innerHTML = +basketItemsCount.innerHTML + (btn.classList.contains('counter__btn--plus') ? 1 : -1);
                                }
                                isAdd = true;
                                prevValue = counter.value;
                            });
                        },
                    });
                });
            });
        } catch (error) {
            console.log(error);
        }

        try {
            document.querySelectorAll('.basket__item').forEach(item => {
                const btns = item.querySelectorAll('.counter__btn')
                const counter = item.querySelector('.counter__input input');

                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        let id = counter.dataset.id;
                        let quantity = +counter.value + (btn.classList.contains('counter__btn--plus') ? 1 : -1);

                        $.ajax({
                            type: 'POST',
                            headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                            url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.add',
                            data: {
                                iProductID: id,
                                iQuantity: +quantity,
                            },
                            success: function (response) {
                                if (document.querySelector('.total-price')) {
                                    $.ajax({
                                        type: 'POST',
                                        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                                        url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.get',
                                        data: {},
                                        success: function (response) {
                                            document.querySelector('.total-price').innerHTML = response.data + ' ₸';
                                        },
                                    });

                                    document.querySelectorAll('.basket__item').forEach(item => {
                                        item.querySelector('.item-total').innerHTML = (+item.dataset.price * +item.querySelector('.counter__input input').value).toDivide() + ' ₸';
                                    });
                                }

                                basketItemsCountSelectors.forEach(basketItemsCount => {
                                    basketItemsCount.style.display = 'flex';
                                    basketItemsCount.innerHTML = +basketItemsCount.innerHTML + 1;
                                });
                            },
                        });
                    });
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    addToBasket();
});

window.addEventListener('DOMContentLoaded', () => {
    const sort = () => {
        const links = document.querySelectorAll('.catalog__sort a');

        links.forEach(link => {
            link.addEventListener('click', () => {
                $.ajax({
                    url: '/ajax/sort.php',
                    method: 'POST',
                    data: {
                        sortten: link.dataset.query,
                    },
                    dataType: 'HTML',
                    success: function () {
                        location.reload();
                    },
                });
            });
        });
    };

    try {
        sort();
    } catch (error) {
        console.log(error);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const form = () => {
        const modalForm = document.querySelectorAll('form.form');
        const emailForm = document.querySelectorAll('.email_form');
        const questionsForm = document.querySelectorAll('.questions-form');
        const modalAccept = document.querySelector('#modalAccept');
        const overlay = document.querySelector("#overlay");

        const forms = [...modalForm, ...emailForm, ...questionsForm];

        forms.forEach(form => {

            form.addEventListener('submit', function (event) {
                event.preventDefault();

                let formData = new FormData(this);
                let formValue = {};

                for (let [name, value] of formData) {
                    formValue[name] = value;
                }

                if (formValue['formName'] === 'Запись на приём' && document.querySelector('#nameDoctor').value) {
                    formValue['doctor'] = document.querySelector('#nameDoctor').value;
                }

                $.ajax({
                    url: '/ajax/form.php',
                    method: 'POST',
                    data: formValue,
                    dataType: 'HTML',
                    success: function (result) {
                        if (result === 'ok') {
                            form.reset();
                            form.parentNode?.classList.remove('active');
                            modalAccept.classList.add('active');
                            overlay.classList.add('active')
                            setTimeout(() => modalAccept.classList.remove('active'), 3000)
                            setTimeout(() => overlay.classList.remove('active'), 3000)
                        }
                    },
                });
            });
        });
    };

    try {
        form();
    } catch (error) {
        console.log(error);
    }
});

function updateSearchParameterURL(id) {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.delete('section_id');
    url.searchParams.append('section_id', id);
    window.history.pushState(null, null, url);
    window.location.reload();
}

window.addEventListener('DOMContentLoaded', () => {
    const materialsSelect = () => {
        const selectValues = document.querySelectorAll('.materials .custom-select-option');

        selectValues.forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.value;
            });
        });
    };

    try {
        materialsSelect();
    } catch (error) {
        console.log(error);
    }
});

const addToFavorite = (iProductID) => {
    const FavoriteItemsCountSelectors = document.querySelectorAll('.header-basket__count.favorite');

    $.ajax({
        type: 'POST',
        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
        url: '/bitrix/services/main/ajax.php?action=coderoom:main.favorite.add',
        data: {
            iProductID: iProductID,
        },
        success: function (response) {
            FavoriteItemsCountSelectors.forEach(favoriteItemsCount => {
                favoriteItemsCount.style.display = 'flex';
                favoriteItemsCount.innerHTML = +favoriteItemsCount.innerHTML + 1;
            });
        }
    });
};

const deleteFavorite = (iProductID) => {
    $.ajax({
        type: 'POST',
        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
        url: '/bitrix/services/main/ajax.php?action=coderoom:main.favorite.delete',
        data: {
            iProductID: iProductID,
        },
        success: function (response) {
            window.location.reload();
        }
    });
};

const authAndREgForm = () => {
    const overlay = document.querySelector('#overlay');
    const modals = document.querySelectorAll('.modal-wrap');

    const regForm = document.querySelector('#modalRegister');
    const regFormBtn = document.querySelectorAll('.register');

    regFormBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });

            regForm.classList.add('active');
            overlay.classList.add('active');

            window.location.hash = '#modalRegister';
        });
    });

    const entryForm = document.querySelector('#modalEntry');
    const entryFormBtn = document.querySelectorAll('.entry');

    entryFormBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });

            entryForm.classList.add('active');
            overlay.classList.add('active');

            window.location.hash = '#modalEntry';
        });
    });

    const forgotForm = document.querySelector('#modalForgot');
    const forgotFormBtn = document.querySelectorAll('.forgot');

    forgotFormBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });

            forgotForm.classList.add('active');
            overlay.classList.add('active');

            window.location.hash = '#modalForgot';
        });
    });

    if (window.location.hash) {
        document.querySelector(window.location.hash).classList.add('active');
        overlay.classList.add('active');
    }
};

try {
    authAndREgForm();
} catch (error) {
    console.log(error);
}

window.addEventListener('DOMContentLoaded', () => {
    const personalArea = () => {
        const form = document.querySelector('.profile');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            let formValue = {};

            for (let [name, value] of formData) {
                formValue[name] = value;
            }

            if (formValue['UF_MAIL'] === 'on') {
                formValue['UF_MAIL'] = 'Y'
            } else {
                formValue['UF_MAIL'] = 'N'
            }

            $.ajax({
                type: 'POST',
                url: '/bitrix/services/main/ajax.php?mode=class&c=coderoom:personal&action=send',
                data: {
                    CONFIRM_PASSWORD: formValue['CONFIRM_PASSWORD'],
                    EMAIL: formValue['EMAIL'],
                    LAST_NAME: formValue['LAST_NAME'],
                    NAME: formValue['NAME'],
                    OLD_PASSWORD: formValue['OLD_PASSWORD'],
                    PASSWORD: formValue['PASSWORD'],
                    PERSONAL_PHONE: formValue['PERSONAL_PHONE'],
                    SECOND_NAME: formValue['SECOND_NAME'],
                    UF_MAIL: formValue['UF_MAIL'],
                },
                success: function (response) {
                    if (response.data.result === 'false') {
                        alert('Проверьте правильность введенных данных.');
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                }
            });
        });
    };

    try {
        personalArea();
    } catch (error) {
        console.log(error);
    }
});

const deleteFromCart = (iProductID) => {
    $.ajax({
        type: 'POST',
        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
        url: '/bitrix/services/main/ajax.php?action=coderoom:main.cart.delete',
        data: {
            iProductID: iProductID,
        },
        success: function (response) {
            window.location.reload();
        }
    });
};

Number.prototype.toDivide = function () {
    let int = String(Math.trunc(this));
    if (int.length <= 3) return int;
    let space = 0;
    let number = '';

    for (var i = int.length - 1; i >= 0; i--) {
        if (space == 3) {
            number = ' ' + number;
            space = 0;
        }
        number = int.charAt(i) + number;
        space++;
    }

    return number;
}

try {
    document.querySelectorAll('.order__methods').forEach(method => {
        method.querySelectorAll('.radio').forEach(item => {
            item.addEventListener('change', () => {
                method.querySelectorAll('.radio').forEach(x => {
                    x.parentNode.classList.remove('active');
                });

                if (item.checked) {
                    item.parentNode.classList.add('active');
                }
            });
        });
    });
} catch (error) {
    console.log(error);
}

const orderFunc = () => {
    const orderBtn = document.querySelector('.order-btn');

    orderBtn.addEventListener('click', () => {
        const orderLastName = document.querySelector('[name="LAST_NAME"]');
        const orderFirstName = document.querySelector('[name="NAME"]');
        const orderSecondName = document.querySelector('[name="SECOND_NAME"]');
        const orderPhone = document.querySelector('[name="PERSONAL_PHONE"]');
        const orderMail = document.querySelector('[name="PERSONAL_EMAIL"]');
        const orderPrivacy = document.querySelector('#order-privacy');
        const orderConditions = document.querySelector('#order-conditions');
        const orderCity = document.querySelector('.bx-ui-sls-fake');
        const orderStreet = document.querySelector('[name="STREET"]');
        const orderHouse = document.querySelector('[name="HOUSE"]');
        const orderFlat = document.querySelector('[name="FLAT"]');
        const orderDate = document.querySelector('#airpicker4');
        const orderPay = document.querySelectorAll('[name="PAY"]');
        const orderDelivery = document.querySelectorAll('[name="DELIVERY"]');
        const orderWarning = document.querySelector('.order__red');
        const orderMessage = document.querySelector('[name="MESSAGE"]');

        const error = document.querySelector('.input__error');

        let courier = 2;
        let courierFlag = false;
        let delivery;
        let pay;

        let street;
        let house;
        let flat;
        let date;

        orderWarning.style.display = 'none';
        error.style.display = 'none';
        orderMail.parentNode.classList.remove('error');

        if (orderLastName.value != '' && orderFirstName != '' && orderPhone != '' && orderMail != '' && orderPrivacy.checked && orderConditions.checked && orderCity != '') {

            orderDelivery.forEach(deliveryItem => {
                let goNext = true;

                if (deliveryItem.checked) {
                    delivery = deliveryItem.id

                    if (`delivery_${courier}` == delivery) {
                        street = orderStreet.value;
                        house = orderHouse.value;
                        flat = orderFlat.value;
                        date = orderDate.value;

                        courierFlag = true;
                    }

                    if (courierFlag) {
                        if (!street && !house && !date) {
                            orderWarning.style.display = 'block';

                            setTimeout(() => {
                                orderWarning.style.display = 'none';
                            }, 7000);

                            goNext = false;
                        }
                    }

                    if (goNext) {
                        orderPay.forEach(payItem => {
                            if (payItem.checked) {
                                pay = payItem.id

                                const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

                                if (EMAIL_REGEXP.test(orderMail.value)) {
                                    let object = {
                                        'FIRST_NAME': orderFirstName.value,
                                        'LAST_NAME': orderLastName.value,
                                        'FIO': `${orderLastName.value} ${orderFirstName.value}${orderSecondName.value ? ' ' + orderSecondName.value : ''}`,
                                        'PHONE': orderPhone.value,
                                        'EMAIL': orderMail.value,
                                        'CITY': orderCity.value,
                                        'DELIVERY': delivery.replace('delivery_', ''),
                                        'PAY': pay.replace('pay_', ''),
                                        'LOCATION': street && house ? (`г. ${orderCity.value}, ул. ${street}, д. ${house}${flat ? ', кв. ' + flat : ''}`) : '',
                                        'DATE': date,
                                        'MESSAGE': orderMessage.value,
                                    };

                                    $.ajax({
                                        type: 'POST',
                                        headers: {'x-bitrix-csrf-token': BX.bitrix_sessid()},
                                        url: '/bitrix/services/main/ajax.php?action=coderoom:main.order.create',
                                        data: {
                                            array: object,
                                        },
                                        success: function (res) {
                                            if (res.data == 'ok') {
                                                window.location = '/';
                                            }
                                        }
                                    });
                                } else {
                                    error.style.display = 'block';
                                    orderMail.parentNode.classList.add('error');
                                    orderWarning.style.display = 'block';

                                    setTimeout(() => {
                                        orderWarning.style.display = 'none';
                                    }, 7000);
                                }
                            }
                        })
                    } else {
                        orderWarning.style.display = 'block';

                        setTimeout(() => {
                            orderWarning.style.display = 'none';
                        }, 7000);
                    }
                }
            });
        } else {
            orderWarning.style.display = 'block';

            setTimeout(() => {
                orderWarning.style.display = 'none';
            }, 7000);
        }
    });
};

window.addEventListener('DOMContentLoaded', () => {
    orderFunc();
});

const onChangeDelivery = () => {
    const btns = document.querySelectorAll('.order__methods.delivery .radio');
    const courierTitle = document.querySelector('.order__title-delivery.courier');
    const courierStreet = document.querySelector('.order__street.courier');
    const courierList = document.querySelector('.profile__list.courier');
    const popover = document.querySelector('.order__popover');
    const map = document.querySelector('.map');

    let courier = 2;
    let pickup = 3;
    let derivation = 4;

    btns.forEach(btn => {
        btn.addEventListener('change', () => {
            courierTitle.classList.add('hidden');
            courierStreet.classList.add('hidden');
            courierList.classList.add('hidden');
            popover.classList.add('hidden');
            map.classList.add('hidden');

            if (`delivery_${courier}` == btn.id) {
                courierTitle.classList.remove('hidden');
                courierStreet.classList.remove('hidden');
                courierList.classList.remove('hidden');
            } else if (`delivery_${pickup}` == btn.id) {
                popover.classList.remove('hidden');
            } else if (`delivery_${derivation}` == btn.id) {
                map.classList.remove('hidden');
            }
        });
    });
};