<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 * @global $arParams
 */
?>

<section class="slider-block">
    <div class="_container p0">
        <h2 class="section-title">
            <span><?php echo $arParams['TITLE']; ?></span>
            <?php if ($arParams['SHOW_LINK'] == 'Y') { ?>
                <a href="<?php echo $arParams['IS_BLOG'] == 'Y' ? '/customer/blog/' : '/about/news/'; ?>" class="btn btn--grey btn--m">Всё о слухе</a>
            <?php } ?>
        </h2>
        <div class="slider-block__wrap swiper blog-slider pb0">
            <div class="swiper-wrapper">
                <?php foreach ($arResult["ITEMS"] as $arItem) { ?>
                    <div class="swiper-slide">
                        <div class="article-preview">
                            <a class="article-preview__pic"
                               href="<?php echo $arParams['IS_BLOG'] == 'Y' ? '/customer/blog/' : '/about/news/'; ?><?php echo $arItem["SECTION_CODE"]; ?>/<?php echo $arItem["CODE"]; ?>/">
                                <img src="<?php echo CFile::GetPath($arItem["PREVIEW_PICTURE"]); ?>"
                                     alt="<?php echo $arItem["NAME"]; ?>"></a>
                            <?php
                                $dateCreate = CIBlockFormatProperties::DateFormat(
                                    'j M Y',
                                    MakeTimeStamp(
                                        $arItem["TIMESTAMP_X"],
                                        CSite::GetDateFormat()
                                    )
                                );
                            ?>
                            <div class="article-preview__date"><?php echo $dateCreate; ?></div>
                            <a class="article-preview__name"
                               href="/about/news/<?php echo $arItem["SECTION_CODE"]; ?>/<?php echo $arItem["CODE"]; ?>/"><?php echo $arItem["NAME"]; ?></a>
                            <p class="article-preview__text"><?php echo $arItem["PREVIEW_TEXT"]; ?></p>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>