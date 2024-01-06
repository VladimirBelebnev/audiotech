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
<div class="catalog__inner">
    <div class="catalog__items">
        <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
            <div class="card">
                <a class="card__pic" href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>">
                    <img src="<?php echo $arItem['PREVIEW_PICTURE']; ?>" alt="<?php echo $arItem['NAME']; ?>">
                </a>
                <a class="card__category" href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>">
                    <?php foreach ($arResult['SECTIONS_NAME'] as $itemID => $sectionName) { ?>
                        <?php if ($itemID == $arItem['ID']) { ?>
                            <?php echo $sectionName; ?>
                        <?php } ?>
                    <?php } ?>
                </a><a class="card__name"
                       href="<?php echo $arItem['DETAIL_PAGE_URL']; ?>"><?php echo $arItem['NAME']; ?></a>
                <!-- TODO старая и новая цена -->
                <div class="card__footer">
                    <div class="card__price card__price--actual"><?php echo $arItem['ITEM_PRICES'][0]['PRINT_BASE_PRICE']; ?></div>
                    <div class="card__price card__price--old"><?php echo $arItem['ITEM_PRICES'][0]['PRINT_BASE_PRICE']; ?></div>
                </div>
            </div>
        <?php } ?>
    </div>

    <div class="pagination">
        <? if ($arParams["DISPLAY_BOTTOM_PAGER"]): ?>
            <?= $arResult["NAV_STRING"]; ?>
        <? endif; ?>
    </div>
</div>