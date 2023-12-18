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

<section class="slider-block">
    <div class="_container">
        <h2 class="section-title"><span>Блог</span>
            <button class="btn btn--grey btn--m">Всё о слухе</button>
        </h2>
        <div class="slider-block__wrap swiper blog-slider pb0">
            <div class="swiper-wrapper">
                <? foreach ($arResult["ITEMS"] as $arItem): ?>
                    <?
                    $this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
                    $this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
                    ?>
                <div class="swiper-slide">
                    <div class="article-preview"><a class="article-preview__pic" href="<?= $arItem["DETAIL_PAGE_URL"] ?>">
                            <img src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>" alt="<? echo $arItem["NAME"] ?>"></a>
                        <?php
                        $dateCreate = CIBlockFormatProperties::DateFormat(
                            'j M Y',
                            MakeTimeStamp(
                                $arItem["TIMESTAMP_X"],
                                CSite::GetDateFormat()
                            )
                        );
                        ?>
                        <div class="article-preview__date"><? echo $dateCreate ?></div>
                        <a class="article-preview__name" href="<?= $arItem["DETAIL_PAGE_URL"] ?>"><? echo $arItem["NAME"] ?></a>
                        <p class="article-preview__text"><? echo $arItem["PREVIEW_TEXT"]; ?></p>
                    </div>
                </div>
                <? endforeach; ?>
            </div>
        </div>
    </div>
</section>