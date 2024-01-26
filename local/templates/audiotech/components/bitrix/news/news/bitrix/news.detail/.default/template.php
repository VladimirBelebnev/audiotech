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

global $arrFilter;
$arrFilter['ID'] = $arResult['PROPERTIES']['CATALOG_ITEMS']['VALUE'];

$dateCreate = CIBlockFormatProperties::DateFormat(
    'j M Y',
    MakeTimeStamp(
        $arResult["TIMESTAMP_X"],
        CSite::GetDateFormat()
    )
);
?>
<section class="news-page">
    <div class="_container">
        <div class="news-page__head">
            <h1 class="title-page news-page__title"><span
                        class="title-page__text"><?php echo $arResult["NAME"]; ?></span></h1>
            <div class="news-page__date"><?php echo $dateCreate; ?></div>
        </div>
        <div class="__container-2cols">
            <div class="news-page__col news-page__content">
                <div class="news-page__block">
                    <div class="news-page__media"><img src="<?php echo $arResult["DETAIL_PICTURE"]["SRC"]; ?>"
                                                       alt="<?php echo $arResult["NAME"]; ?>"></div>
                </div>
                <div class="news-page__block">
                    <div class="__container-s">
                        <?php echo html_entity_decode($arResult["DETAIL_TEXT"]); ?>
                    </div>
                </div>

                <?php


                $APPLICATION->IncludeComponent(
                    "bitrix:catalog.section",
                    "news",
                    array(
                        "COMPONENT_TEMPLATE" => "news",
                        "IBLOCK_TYPE" => "1c_catalog",
                        "IBLOCK_ID" => "1",
                        "SECTION_USER_FIELDS" => array(
                            0 => "",
                            1 => "",
                        ),
                        "FILTER_NAME" => "arrFilter",
                        "INCLUDE_SUBSECTIONS" => "Y",
                        "SHOW_ALL_WO_SECTION" => "N",
                        "CUSTOM_FILTER" => "{\"CLASS_ID\":\"CondGroup\",\"DATA\":{\"All\":\"AND\",\"True\":\"True\"},\"CHILDREN\":[]}",
                        "HIDE_NOT_AVAILABLE" => "N",
                        "HIDE_NOT_AVAILABLE_OFFERS" => "N",
                        "ELEMENT_SORT_FIELD" => "shows",
                        "ELEMENT_SORT_ORDER" => "desc",
                        "ELEMENT_SORT_FIELD2" => "id",
                        "ELEMENT_SORT_ORDER2" => "desc",
                        "PAGE_ELEMENT_COUNT" => "8",
                        "LINE_ELEMENT_COUNT" => "3",
                        "BACKGROUND_IMAGE" => "-",
                        "TEMPLATE_THEME" => "blue",
                        "PRODUCT_ROW_VARIANTS" => "[{'VARIANT':'3','BIG_DATA':false},{'VARIANT':'3','BIG_DATA':false}]",
                        "ENLARGE_PRODUCT" => "STRICT",
                        "PRODUCT_BLOCKS_ORDER" => "price,props,sku,quantityLimit,quantity,buttons",
                        "SHOW_SLIDER" => "N",
                        "ADD_PICT_PROP" => "-",
                        "LABEL_PROP" => array(
                            0 => "BREND",
                            1 => "TIP_KORPUSA",
                            2 => "STEPEN_POTERI_SLUKHA",
                            3 => "MOSHCHNOST",
                            4 => "CML2_MANUFACTURER",
                            5 => "TIP_BATAREYKI",
                            6 => "OSOBENNOSTI",
                            7 => "BLUETOOTH",
                            8 => "AKUSTICHESKIE_SITUATSII",
                        ),
                        "LABEL_PROP_MOBILE" => array(
                            0 => "BREND",
                            1 => "TIP_KORPUSA",
                            2 => "STEPEN_POTERI_SLUKHA",
                            3 => "MOSHCHNOST",
                            4 => "CML2_MANUFACTURER",
                            5 => "TIP_BATAREYKI",
                            6 => "OSOBENNOSTI",
                            7 => "BLUETOOTH",
                            8 => "AKUSTICHESKIE_SITUATSII",
                        ),
                        "LABEL_PROP_POSITION" => "top-left",
                        "PRODUCT_SUBSCRIPTION" => "N",
                        "SHOW_DISCOUNT_PERCENT" => "N",
                        "SHOW_OLD_PRICE" => "N",
                        "SHOW_MAX_QUANTITY" => "N",
                        "SHOW_CLOSE_POPUP" => "N",
                        "MESS_BTN_BUY" => "",
                        "MESS_BTN_ADD_TO_BASKET" => "",
                        "MESS_BTN_SUBSCRIBE" => "",
                        "MESS_BTN_DETAIL" => "",
                        "MESS_NOT_AVAILABLE" => "",
                        "MESS_NOT_AVAILABLE_SERVICE" => "",
                        "RCM_TYPE" => "personal",
                        "RCM_PROD_ID" => $_REQUEST["PRODUCT_ID"],
                        "SHOW_FROM_SECTION" => "N",
                        "SECTION_URL" => "",
                        "DETAIL_URL" => "/catalog/#SECTION_CODE_PATH#/#ELEMENT_CODE#/",
                        "SECTION_ID_VARIABLE" => "SECTION_ID",
                        "SEF_MODE" => "Y",
                        "SEF_RULE" => "",
                        "SECTION_ID" => $_REQUEST["SECTION_ID"],
                        "SECTION_CODE" => "",
                        "SECTION_CODE_PATH" => $_REQUEST["SECTION_CODE_PATH"],
                        "AJAX_MODE" => "N",
                        "AJAX_OPTION_JUMP" => "N",
                        "AJAX_OPTION_STYLE" => "Y",
                        "AJAX_OPTION_HISTORY" => "N",
                        "AJAX_OPTION_ADDITIONAL" => "",
                        "CACHE_TYPE" => "A",
                        "CACHE_TIME" => "36000000",
                        "CACHE_GROUPS" => "Y",
                        "SET_TITLE" => "Y",
                        "SET_BROWSER_TITLE" => "Y",
                        "BROWSER_TITLE" => "-",
                        "SET_META_KEYWORDS" => "Y",
                        "META_KEYWORDS" => "-",
                        "SET_META_DESCRIPTION" => "Y",
                        "META_DESCRIPTION" => "-",
                        "SET_LAST_MODIFIED" => "N",
                        "USE_MAIN_ELEMENT_SECTION" => "N",
                        "ADD_SECTIONS_CHAIN" => "Y",
                        "CACHE_FILTER" => "N",
                        "ACTION_VARIABLE" => "action",
                        "PRODUCT_ID_VARIABLE" => "id",
                        "PRICE_CODE" => array(
                            0 => "Розничная цена",
                        ),
                        "USE_PRICE_COUNT" => "N",
                        "SHOW_PRICE_COUNT" => "1",
                        "PRICE_VAT_INCLUDE" => "Y",
                        "CONVERT_CURRENCY" => "N",
                        "BASKET_URL" => "/personal/cart/",
                        "USE_PRODUCT_QUANTITY" => "N",
                        "PRODUCT_QUANTITY_VARIABLE" => "quantity",
                        "ADD_PROPERTIES_TO_BASKET" => "Y",
                        "PRODUCT_PROPS_VARIABLE" => "prop",
                        "PARTIAL_PRODUCT_PROPERTIES" => "N",
                        "ADD_TO_BASKET_ACTION" => "ADD",
                        "DISPLAY_COMPARE" => "N",
                        "USE_ENHANCED_ECOMMERCE" => "N",
                        "PAGER_TEMPLATE" => ".default",
                        "DISPLAY_TOP_PAGER" => "N",
                        "DISPLAY_BOTTOM_PAGER" => "N",
                        "PAGER_TITLE" => "Товары",
                        "PAGER_SHOW_ALWAYS" => "N",
                        "PAGER_DESC_NUMBERING" => "N",
                        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                        "PAGER_SHOW_ALL" => "N",
                        "PAGER_BASE_LINK_ENABLE" => "N",
                        "LAZY_LOAD" => "N",
                        "MESS_BTN_LAZY_LOAD" => "Показать ещё",
                        "LOAD_ON_SCROLL" => "N",
                        "SET_STATUS_404" => "Y",
                        "SHOW_404" => "N",
                        "MESSAGE_404" => "",
                        "COMPATIBLE_MODE" => "N",
                        "DISABLE_INIT_JS_IN_COMPONENT" => "N",
                        'SECTION_TITLE' => $arResult['PROPERTIES']['CATALOG_TITLE']['VALUE'],
                    ),
                    false
                ); ?>

            </div>
            <form class="news-page__col email_form">
                <input type="hidden" name="formName" value="Подписаться на рассылку">
                <div class="aside-block">
                    <h2 class="aside-block__title">Подписаться на рассылку</h2>
                    <div class="input__overlay">
                        <input class="input-default" type="email" placeholder="Электронная почта">
                    </div>
                    <p class="aside-block__agree">Подписываясь, вы даете согласие на <a href="">обработку персональных
                            данных</a></p>
                    <button class="btn btn--red btn--l btn--icn" type="submit">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Подписаться</span></button>
                </div>
            </form>
        </div>
    </div>
</section>
<?php $APPLICATION->IncludeComponent(
    'coderoom:news.slider',
    '.default',
    [
        'IS_BLOG' => $arParams['IS_BLOG'],
        'TITLE' => 'Похожие статьи',
        'SHOW_LINK' => 'N',
        'ELEMENT_ID' => $arResult['ID'],
    ]
); ?>
<form class="aside-block aside-block--mobile email_form">
    <input type="hidden" name="formName" value="Подписаться на рассылку">
    <h2 class="aside-block__title">Подписаться на рассылку</h2>
    <div class="input__overlay">
        <input class="input-default" type="email" placeholder="Электронная почта">
    </div>
    <p class="aside-block__agree">Подписываясь, вы даете согласие на <a href="">обработку персональных данных</a></p>
    <button class="btn btn--red btn--l btn--icn" type="submit">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Подписаться</span></button>
</form>