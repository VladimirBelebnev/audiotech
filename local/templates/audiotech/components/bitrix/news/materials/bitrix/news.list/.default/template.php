<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<div class="materials__wrap">
    <?php $i = 1; ?>
    <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
        <div class="materials__row">
            <div class="materials__head"><span><?php echo $arItem['NAME']; ?></span></div>
            <div class="materials__content">
                <?php foreach ($arItem['DISPLAY_PROPERTIES']['FILES']['FILE_VALUE'] as $arPhoto) { ?>
                    <?php $format = substr($arPhoto['SRC'], strripos($arPhoto['SRC'], '.') + 1); ?>
                    <a class="materials__item" href="<?php echo $arPhoto['SRC']; ?>" download="">
                        <img src="<?php echo SITE_TEMPLATE_PATH ?>/images/icns/pdf.svg"
                             alt="">
                        <span class="materials__col">
                                <span class="materials__item-name"><?php echo $arPhoto['ORIGINAL_NAME']; ?></span>
                                <span>(<?php echo strtoupper($format); ?>, <?php echo CFile::FormatSize($arPhoto['ID']); ?>)</span>
                            </span>
                    </a>
                <?php } ?>
            </div>
        </div>
        <?php $i++; ?>
    <?php } ?>
</div>

<?php if ($arParams["DISPLAY_BOTTOM_PAGER"] && count($arResult["ITEMS"]) > 8) { ?>
    <div class="pagination">
        <?= $arResult["NAV_STRING"]; ?>
    </div>
<?php } else { ?>
    <div class="news-bottom"></div>
<?php } ?>