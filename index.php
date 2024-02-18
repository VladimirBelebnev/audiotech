<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Главная");
?>
<?php $APPLICATION->IncludeComponent(
    'coderoom:main.slider',
    '.default',
    []
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:main.solution',
    '.default',
    []
); ?>

    <section class="human-block human-block--mode human-block--doc1">
        <div class="human-block__container">
            <div class="_container">
                <div class="human-block__wrap">
                    <h2 class="section-title human-block__title"><?php $APPLICATION->IncludeFile("/include/human-title.php", [], ["MODE" => "html"]); ?></h2>
                    <div class="human-block__descr"><?php $APPLICATION->IncludeFile("/include/human-descr.php", [], ["MODE" => "html"]); ?></div>
                    <a class="btn btn--red btn--icn btn--l" href="#" data-target="modal-reg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H7V3C7 2.44772 7.44772 2 8 2ZM7 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V6H9V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6Z"
                                  fill="white"/>
                            <path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
                                  fill="white"/>
                            <path d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z"
                                  fill="white"/>
                            <path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z"
                                  fill="white"/>
                            <path d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z"
                                  fill="white"/>
                            <path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z"
                                  fill="white"/>
                        </svg>
                        Записаться на приём</a>
                </div>
            </div>
        </div>
    </section>

<?php
$APPLICATION->IncludeComponent(
	"bitrix:catalog.section", 
	"popular", 
	array(
		"COMPONENT_TEMPLATE" => "popular",
		"IBLOCK_TYPE" => "1c_catalog",
		"IBLOCK_ID" => "1",
		"SECTION_USER_FIELDS" => array(
			0 => "",
			1 => "",
		),
		"FILTER_NAME" => "arrFilter",
		"INCLUDE_SUBSECTIONS" => "Y",
		"SHOW_ALL_WO_SECTION" => "N",
		"CUSTOM_FILTER" => "{\"CLASS_ID\":\"CondGroup\",\"DATA\":{\"All\":\"AND\",\"True\":\"True\"},\"CHILDREN\":[{\"CLASS_ID\":\"CondIBProp:1:68\",\"DATA\":{\"logic\":\"Equal\",\"value\":33}},{\"CLASS_ID\":\"CondIBSection\",\"DATA\":{\"logic\":\"Equal\",\"value\":15}}]}",
		"HIDE_NOT_AVAILABLE" => "N",
		"HIDE_NOT_AVAILABLE_OFFERS" => "N",
		"ELEMENT_SORT_FIELD" => "show_counter",
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
		"DISABLE_INIT_JS_IN_COMPONENT" => "N"
	),
	false
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:main.brands',
    '.default',
    []
); ?>

<?php
$APPLICATION->IncludeComponent(
	"bitrix:catalog.section", 
	"accessories", 
	array(
		"COMPONENT_TEMPLATE" => "accessories",
		"IBLOCK_TYPE" => "1c_catalog",
		"IBLOCK_ID" => "1",
		"SECTION_USER_FIELDS" => array(
			0 => "",
			1 => "1",
			2 => "",
		),
		"FILTER_NAME" => "arrFilter",
		"INCLUDE_SUBSECTIONS" => "Y",
		"SHOW_ALL_WO_SECTION" => "N",
		"CUSTOM_FILTER" => "{\"CLASS_ID\":\"CondGroup\",\"DATA\":{\"All\":\"AND\",\"True\":\"True\"},\"CHILDREN\":[{\"CLASS_ID\":\"CondIBSection\",\"DATA\":{\"logic\":\"Equal\",\"value\":2}},{\"CLASS_ID\":\"CondIBProp:1:68\",\"DATA\":{\"logic\":\"Equal\",\"value\":33}}]}",
		"HIDE_NOT_AVAILABLE" => "Y",
		"HIDE_NOT_AVAILABLE_OFFERS" => "Y",
		"ELEMENT_SORT_FIELD" => "shows",
		"ELEMENT_SORT_ORDER" => "asc",
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
		"PARTIAL_PRODUCT_PROPERTIES" => "Y",
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
		"DISABLE_INIT_JS_IN_COMPONENT" => "N"
	),
	false
); ?>


    <section class="find-centers">
        <div class="_container">
            <div class="find-centers__wrap">
                <div class="find-centers__box">
                    <?php $APPLICATION->IncludeFile("/include/centers-1.php", [], ["MODE" => "html"]); ?>
                    <?php $APPLICATION->IncludeFile("/include/centers-2.php", [], ["MODE" => "html"]); ?>
                    <?php $APPLICATION->IncludeFile("/include/centers-3.php", [], ["MODE" => "html"]); ?>
                    <?php $APPLICATION->IncludeFile("/include/centers-4.php", [], ["MODE" => "html"]); ?>
                </div>
                <div class="find-centers__box">
                    <h2 class="section-title find-centers__title"><?php $APPLICATION->IncludeFile("/include/centers-title.php", [], ["MODE" => "html"]); ?></h2>
                    <p class="find-centers__text"><?php $APPLICATION->IncludeFile("/include/centers-descr.php", [], ["MODE" => "html"]); ?></p>
                    <a href="/centers/" class="btn btn--red btn--l btn--icn">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M10.5 4C8.9087 4 7.38258 4.63214 6.25736 5.75736C5.13214 6.88258 4.5 8.4087 4.5 10C4.5 10.7879 4.65519 11.5681 4.95672 12.2961C5.25825 13.0241 5.70021 13.6855 6.25736 14.2426C6.81451 14.7998 7.47595 15.2417 8.2039 15.5433C8.93185 15.8448 9.71207 16 10.5 16C11.2879 16 12.0681 15.8448 12.7961 15.5433C13.5241 15.2417 14.1855 14.7998 14.7426 14.2426C15.2998 13.6855 15.7417 13.0241 16.0433 12.2961C16.3448 11.5681 16.5 10.7879 16.5 10C16.5 8.4087 15.8679 6.88258 14.7426 5.75736C13.6174 4.63214 12.0913 4 10.5 4ZM4.84315 4.34315C6.34344 2.84285 8.37827 2 10.5 2C12.6217 2 14.6566 2.84285 16.1569 4.34315C17.6571 5.84344 18.5 7.87827 18.5 10C18.5 11.0506 18.2931 12.0909 17.891 13.0615C17.6172 13.7226 17.2565 14.3425 16.8196 14.9054L22.2071 20.2929C22.5976 20.6834 22.5976 21.3166 22.2071 21.7071C21.8166 22.0976 21.1834 22.0976 20.7929 21.7071L15.4054 16.3196C14.8425 16.7565 14.2226 17.1172 13.5615 17.391C12.5909 17.7931 11.5506 18 10.5 18C9.44943 18 8.40914 17.7931 7.43853 17.391C6.46793 16.989 5.58601 16.3997 4.84315 15.6569C4.10028 14.914 3.511 14.0321 3.10896 13.0615C2.70693 12.0909 2.5 11.0506 2.5 10C2.5 7.87827 3.34285 5.84344 4.84315 4.34315Z"
                                  fill="white"/>
                        </svg>
                        Найти центр
                    </a>
                </div>
            </div>
        </div>
    </section>

<?php $APPLICATION->IncludeComponent(
    'coderoom:main.offers',
    '.default',
    []
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:news.slider',
    '.default',
    [
        'IS_BLOG' => 'Y',
        'TITLE' => 'Блог',
        'SHOW_LINK' => 'Y',
        'ELEMENT_ID' => null
    ]
);
?>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>