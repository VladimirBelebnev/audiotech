<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
use Bitrix\Catalog\ProductTable;

/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CatalogSectionComponent $component
 * @var CBitrixComponentTemplate $this
 * @var string $templateName
 * @var string $componentPath
 */

$this->setFrameMode(true);
?>
<div class="catalog__inner" id="catalogAjax">
    <div class="catalog__items">
        <?php if ($arResult['ITEMS']) { ?>
            <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
                <div class="card">
                    <a class="card__pic" href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>">
                        <img src="<?php echo $arItem['PREVIEW_PICTURE'] ? $arItem['PREVIEW_PICTURE']['SRC'] : SITE_TEMPLATE_PATH . '/images/no-photo.png'; ?>" alt="<?php echo $arItem['NAME']; ?>">
                    </a>
                    <span class="card__category">
                        <?php foreach ($arResult['SECTIONS_NAME'] as $itemID => $sectionName) { ?>
                            <?php if ($itemID == $arItem['ID']) { ?>
                                <?php echo $sectionName; ?>
                            <?php } ?>
                        <?php } ?>
                    </span>
                    <a class="card__name"
                           href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>"><?php echo $arItem['NAME']; ?></a>
                    <div class="card__footer">
                        <div class="card__price card__price--actual"><?php echo $arItem['ITEM_PRICES'][0]['PRINT_BASE_PRICE']; ?></div>
                        <?php if ($arItem['PROPERTIES']['OLD_PRICE']['VALUE'] && $arItem['PROPERTIES']['OLD_PRICE']['VALUE'] > $arItem['ITEM_PRICES'][0]['PRICE']) { ?>
                            <div class="product-descr__old-price"><?php echo number_format($arItem['PROPERTIES']['OLD_PRICE']['VALUE'], 0, '', ' '); ?> ₸</div>
                        <?php } ?>
                    </div>
                </div>
            <?php } ?>
        <?php } else { ?>
            <p>Элементов не найдено.</p>
        <?php } ?>
    </div>

    <?php if ($arParams["DISPLAY_BOTTOM_PAGER"] && count($arResult["ITEMS"]) > 15) { ?>
        <div class="pagination">
            <?= $arResult["NAV_STRING"]; ?>
        </div>
    <?php } ?>
</div>