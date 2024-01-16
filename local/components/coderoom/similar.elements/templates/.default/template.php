<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 * @global $arParams
 */
?>
<section class="slider-block">
    <div class="_container">
        <h2 class="section-title"><span>Похожие товары</span>
            <a href="<?php echo $arParams['SECTION_PATH']; ?>" class="btn btn--grey btn--m">Смотреть все</a>
        </h2>
        <div class="slider-block__wrap swiper popular-slider pr30">
            <div class="swiper-wrapper">

                <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
                    <div class="swiper-slide">
                        <div class="card">
                            <a class="card__pic" href="/catalog/<?php echo $arItem['DETAIL_PAGE_URL']; ?>">
                                <img src="<?php echo $arItem['PREVIEW_PICTURE'] ? $arItem['PREVIEW_PICTURE']['SRC'] : SITE_TEMPLATE_PATH . '/images/no-photo.png'; ?>" alt="<?php echo $arItem['NAME']; ?>">
                            </a>
                            <a class="card__category" href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>"><?php echo $arItem['SECTION']; ?></a>
                            <a class="card__name" href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>"><?php echo $arItem['NAME']; ?></a>
                            <!-- TODO старая и новая цена -->
                            <div class="card__footer">
                                <div class="card__price card__price--actual"><?php echo $arItem['ITEM_PRICES'][0]['PRINT_BASE_PRICE']; ?></div>
                                <div class="card__price card__price--old"><?php echo $arItem['ITEM_PRICES'][0]['PRINT_BASE_PRICE']; ?></div>
                            </div>
                        </div>
                    </div>
                <?php } ?>

            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-navigation">
                <div class="swiper-button-prev">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5L4 12M4 12L11 19M4 12H20" stroke="#131313" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="swiper-button-next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5L20 12M20 12L13 19M20 12H4" stroke="#131313" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</section>