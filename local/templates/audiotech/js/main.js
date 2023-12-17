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
                        value = 0;
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




});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBtaW5WaWV3UG9ydCA9IChtaW4gPSAzMDApID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IG1pbikge1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInZpZXdwb3J0XCJdJyk7XG4gICAgICAgICAgICBpZiAodmlld3BvcnQpXG4gICAgICAgICAgICAgICAgdmlld3BvcnQuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBgd2lkdGg9JHttaW59LCB1c2VyLXNjYWxhYmxlPW5vYCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWluVmlld1BvcnQoKTtcblxuICAgIC8vIGN1c3RvbSBzZWxlY3RcbiAgICBjdXN0b21TZWxlY3QoJy5teVNlbGVjdCcpO1xuICAgIGNvbnN0IGNzdFNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teVNlbGVjdCcpLmN1c3RvbVNlbGVjdFxuXG4gICAgY29uc3QgbXlTZWxlY3RQcmllbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teVNlbGVjdFByaWVtJyk7XG4gICAgY29uc3QgYXJyQWlyUGlja2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFpclBpY2tlcicpO1xuXG4gICAgbXlTZWxlY3RQcmllbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChteVNlbGVjdFByaWVtLnZhbHVlICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgIGFyckFpclBpY2tlci5mb3JFYWNoKHBpY2tlciA9PiB7XG4gICAgICAgICAgICAgICAgcGlja2VyLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJBaXJQaWNrZXIuZm9yRWFjaChwaWNrZXIgPT4ge1xuICAgICAgICAgICAgICAgIHBpY2tlci5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY3VzdG9tIHNlbGVjdFxuXG4gICAgbmV3IEFpckRhdGVwaWNrZXIoJyNhaXJwaWNrZXInLCB7XG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoZGF0ZVRleHQsIGluc3QpIHtcbiAgICAgICAgICAgIHNob3dUaW1lcygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgQWlyRGF0ZXBpY2tlcignI2FpcnBpY2tlcjInLCB7XG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoZGF0ZVRleHQsIGluc3QpIHtcbiAgICAgICAgICAgIHNob3dUaW1lcygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgQWlyRGF0ZXBpY2tlcignI2FpcnBpY2tlcjMnLCB7XG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbiAoZGF0ZVRleHQsIGluc3QpIHtcbiAgICAgICAgICAgIHNob3dUaW1lcygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzaG93VGltZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fdGltZXMtd3JhcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIC8vIGhlYWRlciBzdGlreVxuICAgIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXlGdW5jdGlvbigpXG4gICAgfTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpO1xuICAgIGNvbnN0IGhlYWRlckJvdHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItYm90dG9tJyk7XG4gICAgY29uc3Qgc3RpY2t5ID0gaGVhZGVyQm90dG9tLm9mZnNldFRvcDtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBoZWFkZXJCb3R0b20uY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IG1lbnVGdWxsU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2X19zdWJtZW51LXdyYXAtLWZ1bGwtc2NyZWVuJylcblxuICAgIG1lbnVGdWxsU2NyZWVuLnN0eWxlLnRvcCA9IGhlYWRlci5jbGllbnRIZWlnaHQgLSAyICsgJ3B4JztcblxuICAgIGZ1bmN0aW9uIG15RnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IHN0aWNreSAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDk0MCkge1xuICAgICAgICAgICAgaGVhZGVyQm90dG9tLmNsYXNzTGlzdC5hZGQoXCJzdGlja3lcIik7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuc3R5bGUucGFkZGluZ1RvcCA9IGhlYWRlckhlaWdodCArICdweCc7XG4gICAgICAgIH0gaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCkge1xuICAgICAgICAgICAgbWVudUZ1bGxTY3JlZW4uc3R5bGUudG9wID0gaGVhZGVySGVpZ2h0IC0gMSArICdweCc7XG4gICAgICAgIH0gaWYgKHdpbmRvdy5zY3JvbGxZIDwgc3RpY2t5ICYmIHdpbmRvdy5pbm5lcldpZHRoID4gOTQwKSB7XG4gICAgICAgICAgICBoZWFkZXJCb3R0b20uY2xhc3NMaXN0LnJlbW92ZShcInN0aWNreVwiKTtcbiAgICAgICAgICAgIG1lbnVGdWxsU2NyZWVuLnN0eWxlLnRvcCA9IGhlYWRlci5jbGllbnRIZWlnaHQgLSAyICsgJ3B4JztcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5zdHlsZS5wYWRkaW5nVG9wID0gJzBweCc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5NDApIHtcbiAgICAgICAgaGVhZGVyQm90dG9tLmNsYXNzTGlzdC5hZGQoXCJzdGlja3lcIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5zdHlsZS5wYWRkaW5nVG9wID0gaGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gICAgLy8gaGVhZGVyIHN0aWt5XG5cblxuICAgIGNvbnN0IG1vZGFscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC13cmFwJyk7XG4gICAgbW9kYWxzLmZvckVhY2gobW9kYWwgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcubW9kYWwnKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLmFpci1kYXRlcGlja2VyJykgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWlyLWRhdGVwaWNrZXItY2VsbCcpKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBzY3JvbGxMb2NrLmVuYWJsZVBhZ2VTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIGNvbnN0IGJ1cmdlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xuICAgIGNvbnN0IG1haW5OYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2XCIpO1xuICAgIGJ1cmdlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICBtYWluTmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG4gICAgICAgIG1haW5OYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKVxuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9KTtcblxuXG4gICAgY29uc3Qgc2hvd0ZpbHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgYnRuU2hvd0ZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hvd0ZpbHRlclwiKTtcbiAgICAgICAgY29uc3QgZmlsdGVyV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XG4gICAgICAgIGlmIChidG5TaG93RmlsdGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBidG5TaG93RmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyV2luZG93LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZSA9IFwib3ZlcmZsb3c6IGhpZGRlblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2hvd0ZpbHRlcigpO1xuXG4gICAgLy8gbW9kYWxcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICAgIGNvbnN0IGJ0blN1Ym1pdFJlZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fcmVnIC5idG4nKTtcblxuICAgIGNvbnN0IGhpZGRlbk1vZGFsQWNjZXB0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG1vZGFsQWNjZXB0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpLCAzMDAwKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyksIDMwMDApXG4gICAgfVxuXG4gICAgY29uc3Qgc3VibWl0UmVnID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgYnRuU3VibWl0UmVnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG1vZGFsUmVnLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbW9kYWxBY2NlcHQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3VibWl0UmVnKGhpZGRlbk1vZGFsQWNjZXB0KTtcblxuXG4gICAgY29uc3QgbW9kYWxzb3BlbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC50YXJnZXQgPT09ICdtb2RhbC1yZWcnIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJ2FbZGF0YS10YXJnZXQ9XCJtb2RhbC1yZWdcIl0nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsUmVnJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuZG9jdG9yc19faXRlbScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZS50YXJnZXQuY2xvc2VzdCgnLmRvY3RvcnNfX2l0ZW0nKS5xdWVyeVNlbGVjdG9yKCcuZG9jdG9yc19fbmFtZScpLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZURvY3RvcicpLnZhbHVlID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dERvYycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dERvYycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmRhdGFzZXQudGFyZ2V0ID09PSAnbW9kYWwtY2FsbCcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2Nyb2xsTG9jay5lbmFibGVQYWdlU2Nyb2xsKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsQ2FsbCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmRhdGFzZXQuY2xvc2UgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbG9zZXN0KCcubW9kYWwtd3JhcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIG1vZGFsc29wZW4oKTtcblxuICAgIGNvbnN0IG1vZGFsczQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKTtcbiAgICBtb2RhbHM0LmZvckVhY2gobW9kYWwgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS13aW5kb3cnKTtcbiAgICAgICAgaWYgKGNsb3NlKSB7XG4gICAgICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UuY2xvc2VzdCgnLm1vZGFsLXdyYXAnKS5zY3JvbGxUbygxMDAsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gbW9kYWxcblxuICAgIC8vIHRhYnNcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBJdGNUYWJzKCcudGFicycpO1xuICAgIH1cbiAgICAvLyB0YWJzXG5cbiAgICAvLyBmYXZvcml0ZVxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWZhdm9yaXRlJykubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBidG5zRmF2b3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWZhdm9yaXRlJyk7XG4gICAgICAgIGJ0bnNGYXZvcml0ZS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5xdWVyeVNlbGVjdG9yKCdzcGFuJykuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINCyINC40LfQsdGA0LDQvdC90L7QtVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5xdWVyeVNlbGVjdG9yKCdzcGFuJykuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LvQtdC90L4g0LIg0LjQt9Cx0YDQsNC90L3QvtC1XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIGZhdm9yaXRlXG5cbiAgICAvLyBjb3VudGVyXG4gICAgY29uc3QgY291bnRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb3VudGVyXScpO1xuICAgIGlmIChjb3VudGVycykge1xuICAgICAgICBjb3VudGVycy5mb3JFYWNoKGNvdW50ZXIgPT4ge1xuICAgICAgICAgICAgY291bnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnLmNvdW50ZXJfX2J0bicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRhcmdldC5jbG9zZXN0KCcuY291bnRlcicpLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5jb3VudGVyX19idG4tLXBsdXMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC0tdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuY291bnRlcicpLnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyX19idG4tLW1pbnVzJykuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuY291bnRlcicpLnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyX19idG4tLW1pbnVzJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSB0YXJnZXQuY2xvc2VzdCgnLmNvdW50ZXInKS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gY291bnRlclxuXG4gICAgLy8gYWRkIGJhc2tldFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkSW5CYXNrZXQnKSkge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZSgpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYXNrZXRfX2l0ZW1zJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFza2V0X19pdGVtcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnLmJhc2tldF9fcmVtb3ZlLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCcuYmFza2V0X19pdGVtJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIGFkZCBiYXNrZXRcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCcuY2xvc2UtZmlsdGVyJykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xvc2VzdCgnLmZpbHRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUgPSBcIm92ZXJmbG93OiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBidG5zTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLW5hdl9fbGluaycpO1xuICAgIGJ0bnNMaW5rLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IGJ0bnNUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLXN1Ym1lbnVfX3RpdGxlJyk7XG4gICAgYnRuc1RpdGxlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDI1KSB7XG4gICAgICAgIC8vIG1haW5OYXYuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoJHtkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodH1weCAtICR7aGVhZGVySGVpZ2h0fXB4KWA7XG4gICAgICAgIG1haW5OYXYuc3R5bGUuaGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7aGVhZGVySGVpZ2h0fXB4KWA7XG4gICAgfVxuXG4gICAgY29uc3QgZmF2b3JpdGVDaG9vc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZhdm9yaXRlSWNucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4taWNuX19mYXZvcml0ZScpO1xuICAgICAgICBmYXZvcml0ZUljbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGZhdm9yaXRlQ2hvb3NlKCk7XG5cbiAgICBjb25zdCBoaWRlQ2hlY2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBidG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcl9fYWxsJyk7XG4gICAgICAgIGJ0bnMuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgY29uc3Qgd3JhcCA9IGJ0bi5jbG9zZXN0KCcuZmlsdGVyLWJveCcpO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB3cmFwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItYm94X19pdGVtJyk7XG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAn0KHQstC10YDQvdGD0YLRjCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICfQn9C+0LrQsNC30LDRgtGMINCy0YHQtSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaGlkZUNoZWNrcygpO1xuXG5cbiAgICBjb25zdCBmU2hvd1BpY1Byb2R1Y3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19zbGlkZXIgLnByb2R1Y3RfX3ByZXZpZXcnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICghKGUudGFyZ2V0LmNsb3Nlc3QoJy5wbGF5LXZpZGVvJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbExvY2suZGlzYWJsZVBhZ2VTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3NsaWRlcjInKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBmU2hvd1BpY1Byb2R1Y3QoKTtcblxuICAgIGNvbnN0IGJ0blBsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXBsYXknKTtcbiAgICBjb25zdCBmUGxheVZpZGVvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB2aWRlb1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcCcpO1xuICAgICAgICBjb25zdCBidG5TdG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3AtdmlkZW8nKTtcbiAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8nKTtcbiAgICAgICAgY29uc3Qgc3JjID0gdmlkZW8uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgYnRuUGxheS5mb3JFYWNoKHBsYXkgPT4ge1xuICAgICAgICAgICAgcGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZpZGVvV3JhcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyArICcmYXV0b3BsYXk9MScpO1xuICAgICAgICAgICAgICAgIHNjcm9sbExvY2suZW5hYmxlUGFnZVNjcm9sbCgpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zbGlkZXIyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgYnRuU3RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZpZGVvV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjICsgJyZhdXRvcGxheT0wJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChidG5QbGF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgZlBsYXlWaWRlbygpO1xuICAgIH1cblxuICAgIGNvbnN0IGZIaWRkZW5QaWNQcm9kdWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtcHJvZHVjdC1waWMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgc2Nyb2xsTG9jay5lbmFibGVQYWdlU2Nyb2xsKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fc2xpZGVyMicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjbG9zZS1wcm9kdWN0LXBpYycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZkhpZGRlblBpY1Byb2R1Y3QoKTtcbiAgICB9XG5cbiAgICAvL2NoaXBzXG4gICAgY29uc3QgY2hpcHNCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoaXBzX19pdGVtJyk7XG4gICAgY2hpcHNCdG5zLmZvckVhY2goYnRuID0+IHtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNoaXBzQnRucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2hpcHNfX2l0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIHRvb2x0aXBcbiAgICB0aXBweSgnI3RpcCcsIHtcbiAgICAgICAgY29udGVudDogJzxkaXYgY2xhc3M9XCJ0b29sdGlwX190aXRsZVwiPtCSINGB0YLQvtC40LzQvtGB0YLRjCDQstGF0L7QtNC40YI6PC9kaXY+PHVsIGNsYXNzPVwidG9vbHRpcF9fbGlzdFwiPjxsaT7QmtC+0YDQv9GD0YE8L2xpPjxsaT7QmtGA0YvRiNC60LA8L2xpPjxsaT7QlNC10YDQttCw0YLQtdC70Ywg0Y3Qu9C10LzQtdC90YLQsCDQv9C40YLQsNC90LjRjzwvbGk+PGxpPtCf0LXRgNC10YXQvtC0PC9saT48bGk+0KDQtdCz0YPQu9GP0YLQvtGA0Ysg0L3QsNGB0YLRgNC+0LnQutC4PC9saT48bGk+0KHRgtCw0L3QtNCw0YDRgtC90YvQuSDRg9GI0L3QvtC5INCy0LrQu9Cw0LTRi9GIPC9saT48L3VsPicsXG4gICAgICAgIGFsbG93SFRNTDogdHJ1ZSxcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICB9KTtcblxuICAgIC8vIHNob3dIaWRkZW5UZXh0XG4gICAgY29uc3Qgc2hvd0hpZGRlblRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGJ0bnNTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNob3ctdGV4dCcpO1xuICAgICAgICBidG5zU2hvdy5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jbG9zZXN0KCcudGFic19fcGFyJykucXVlcnlTZWxlY3RvcigncCcpLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuLXRleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICBidG4uY2xvc2VzdCgnLnRhYnNfX3BhcicpLnF1ZXJ5U2VsZWN0b3IoJ3AnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4tdGV4dCcpLCBidG4uaW5uZXJIVE1MID0gJ9GB0LLQtdGA0L3Rg9GC0YwnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jbG9zZXN0KCcudGFic19fcGFyJykucXVlcnlTZWxlY3RvcigncCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JyksIGJ0bi5pbm5lckhUTUwgPSAn0J/QvtC60LDQt9Cw0YLRjCDQstGB0LUnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hvdy10ZXh0JykubGVuZ3RoID4gMCkge1xuICAgICAgICBzaG93SGlkZGVuVGV4dCgpO1xuICAgIH1cblxuICAgIC8vIGJyZWFkY3J1bWJzIGFkYXB0aXZlXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzAwICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5icmVhZGNydW1iIGxpJykubGVuZ3RoID4gMikge1xuICAgICAgICBjb25zdCBicmVhZGNydW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5icmVhZGNydW1iIGxpJyk7XG4gICAgICAgIGJyZWFkY3J1bWJzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID09IGJyZWFkY3J1bWJzLmxlbmd0aCAtIDEgfHwgaSA8IGJyZWFkY3J1bWJzLmxlbmd0aCAtIDMpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVyMicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3NsaWRlcjInKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBzY3JvbGxMb2NrLmVuYWJsZVBhZ2VTY3JvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBjb25zdCBtb3ZlRWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQgLnN1YnNjcmliZScpO1xuICAgICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0IC5uZXdzJyk7XG4gICAgICAgIGxldCByZWZlcmVuY2VFbGVtZW50O1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5NDApIHtcbiAgICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZS1wcmV2aWV3Om50aC1jaGlsZCg1KScpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDk0MCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDcwMCkge1xuICAgICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXByZXZpZXc6bnRoLWNoaWxkKDQpJyk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgcmVmZXJlbmNlRWxlbWVudCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQgLnN1YnNjcmliZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbW92ZUVsKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcG9zTW9kYWxSZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlclRvcEhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItdG9wJykuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBtb2RhbFJlZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fcmVnJyk7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk0MCkge1xuICAgICAgICAgICAgbW9kYWxSZWcuc3R5bGUudG9wID0gaGVhZGVyVG9wSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGFsUmVnLnN0eWxlLnRvcCA9IGhlYWRlckhlaWdodCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcG9zTW9kYWxSZWcoKTtcblxuXG4gICAgY29uc3QgbXlGYW5jeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgbGljZW5zZU92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5zZS1vdmVybGF5Jyk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpY2Vuc2VzX19saW5rJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1GdWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpY2Vuc2UtZnVsbCcpO1xuICAgICAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1saWNlbnNlJyk7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaHJlZiA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbGljZW5zZU92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaXRlbUZ1bGwuc2V0QXR0cmlidXRlKCdzcmMnLCBocmVmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpY2Vuc2VPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIH0pO1xuICAgICAgICBsaWNlbnNlT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIShlLnRhcmdldC5jbG9zZXN0KCcubGljZW5zZS1vdmVybGF5X193cmFwJykpKSB7XG4gICAgICAgICAgICAgICAgbGljZW5zZU92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGljZW5zZS1vdmVybGF5JykubGVuZ3RoID4gMCkge1xuICAgICAgICBteUZhbmN5KCk7XG4gICAgfVxuXG5cblxuXG59KTtcblxuIl0sImZpbGUiOiJtYWluLmpzIn0=
