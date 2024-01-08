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

use Bitrix\Main\Loader;
use Bitrix\Main\ModuleManager;

$this->setFrameMode(true);

if (isset($arParams['USE_COMMON_SETTINGS_BASKET_POPUP']) && $arParams['USE_COMMON_SETTINGS_BASKET_POPUP'] == 'Y') {
    $basketAction = $arParams['COMMON_ADD_TO_BASKET_ACTION'] ?? '';
} else {
    $basketAction = $arParams['SECTION_ADD_TO_BASKET_ACTION'] ?? '';
}

if (!isset($arParams['FILTER_VIEW_MODE']) || (string)$arParams['FILTER_VIEW_MODE'] == '')
    $arParams['FILTER_VIEW_MODE'] = 'VERTICAL';
$arParams['USE_FILTER'] = (isset($arParams['USE_FILTER']) && $arParams['USE_FILTER'] == 'Y' ? 'Y' : 'N');

$isVerticalFilter = ('Y' == $arParams['USE_FILTER'] && $arParams["FILTER_VIEW_MODE"] == "VERTICAL");
$isSidebar = ($arParams["SIDEBAR_SECTION_SHOW"] == "Y" && isset($arParams["SIDEBAR_PATH"]) && !empty($arParams["SIDEBAR_PATH"]));
$isFilter = ($arParams['USE_FILTER'] == 'Y');

if ($isFilter) {
    $arFilter = array(
        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
        "ACTIVE" => "Y",
        "GLOBAL_ACTIVE" => "Y",
    );
    if (0 < intval($arResult["VARIABLES"]["SECTION_ID"]))
        $arFilter["ID"] = $arResult["VARIABLES"]["SECTION_ID"];
    elseif ('' != $arResult["VARIABLES"]["SECTION_CODE"])
        $arFilter["=CODE"] = $arResult["VARIABLES"]["SECTION_CODE"];

    $obCache = new CPHPCache();
    if ($obCache->InitCache(36000, serialize($arFilter), "/iblock/catalog")) {
        $arCurSection = $obCache->GetVars();
    } elseif ($obCache->StartDataCache()) {
        $arCurSection = array();
        if (Loader::includeModule("iblock")) {
            $dbRes = CIBlockSection::GetList(array(), $arFilter, false, array("ID"));

            if (defined("BX_COMP_MANAGED_CACHE")) {
                global $CACHE_MANAGER;
                $CACHE_MANAGER->StartTagCache("/iblock/catalog");

                if ($arCurSection = $dbRes->Fetch())
                    $CACHE_MANAGER->RegisterTag("iblock_id_" . $arParams["IBLOCK_ID"]);

                $CACHE_MANAGER->EndTagCache();
            } else {
                if (!$arCurSection = $dbRes->Fetch())
                    $arCurSection = array();
            }
        }
        $obCache->EndDataCache($arCurSection);
    }
    if (!isset($arCurSection))
        $arCurSection = array();
}
?>
<section class="catalog">
    <div class="_container">
        <h1 class="title-page catalog__title" data-count="<?php $APPLICATION->ShowProperty('element_count'); ?>"><?php $APPLICATION->ShowTitle(false); ?></h1>
        <div class="chips">
            <div class="chips__inner chips__inner--sort">
                <button class="chips__item">Для легкой потери слуха</button>
                <button class="chips__item">Для средней потери слуха</button>
                <button class="chips__item">Для тяжелой потери слуха</button>
                <button class="chips__item">Ampliphon</button>
                <button class="chips__item">Oticon</button>
                <button class="chips__item">Signia</button>
                <button class="chips__item">Аналоговые</button>
                <button class="chips__item">Цифровые</button>
                <button class="chips__item">Заушные</button>
                <button class="chips__item">Заушные с выносным ресивером</button>
                <button class="chips__item">Внутриушные</button>
                <button class="chips__item">Внутриканальные</button>
            </div>
        </div>
        <div class="catalog__wrap">
            <div class="catalog__filter-mobile">
                <h3 class="filter__title">Фильтры</h3>
                <button id="showFilter">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M21 6C21 6.55228 20.5523 7 20 7L10.8284 7C10.6807 7.4179 10.4407 7.80192 10.1213 8.12132C9.55871 8.68393 8.79565 9 8 9C7.20435 9 6.44129 8.68393 5.87868 8.12132C5.55928 7.80192 5.31933 7.4179 5.17157 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5H5.17157C5.31933 4.5821 5.55928 4.19808 5.87868 3.87868C6.44129 3.31607 7.20435 3 8 3C8.79565 3 9.55871 3.31607 10.1213 3.87868C10.4407 4.19808 10.6807 4.5821 10.8284 5H20C20.5523 5 21 5.44772 21 6ZM21 12C21 12.5523 20.5523 13 20 13H18.8284C18.6807 13.4179 18.4407 13.8019 18.1213 14.1213C17.5587 14.6839 16.7957 15 16 15C15.2043 15 14.4413 14.6839 13.8787 14.1213C13.5593 13.8019 13.3193 13.4179 13.1716 13L4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11L13.1716 11C13.3193 10.5821 13.5593 10.1981 13.8787 9.87868C14.4413 9.31607 15.2043 9 16 9C16.7957 9 17.5587 9.31607 18.1213 9.87868C18.4407 10.1981 18.6807 10.5821 18.8284 11H20C20.5523 11 21 11.4477 21 12ZM21 18C21 18.5523 20.5523 19 20 19H10.8284C10.6807 19.4179 10.4407 19.8019 10.1213 20.1213C9.55871 20.6839 8.79565 21 8 21C7.20435 21 6.44129 20.6839 5.87868 20.1213C5.55928 19.8019 5.31933 19.4179 5.17157 19H4C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17H5.17157C5.31933 16.5821 5.55928 16.1981 5.87868 15.8787C6.44129 15.3161 7.20435 15 8 15C8.79565 15 9.55871 15.3161 10.1213 15.8787C10.4407 16.1981 10.6807 16.5821 10.8284 17H20C20.5523 17 21 17.4477 21 18ZM17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11C15.7348 11 15.4804 11.1054 15.2929 11.2929C15.1054 11.4804 15 11.7348 15 12C15 12.2652 15.1054 12.5196 15.2929 12.7071C15.4804 12.8946 15.7348 13 16 13C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12ZM9 6C9 5.73478 8.89464 5.48043 8.70711 5.29289C8.51957 5.10536 8.26522 5 8 5C7.73478 5 7.48043 5.10536 7.29289 5.29289C7.10536 5.48043 7 5.73478 7 6C7 6.26522 7.10536 6.51957 7.29289 6.70711C7.48043 6.89464 7.73478 7 8 7C8.26522 7 8.51957 6.89464 8.70711 6.70711C8.89464 6.51957 9 6.26522 9 6ZM9 18C9 17.7348 8.89464 17.4804 8.70711 17.2929C8.51957 17.1054 8.26522 17 8 17C7.73478 17 7.48043 17.1054 7.29289 17.2929C7.10536 17.4804 7 17.7348 7 18C7 18.2652 7.10536 18.5196 7.29289 18.7071C7.48043 18.8946 7.73478 19 8 19C8.26522 19 8.51957 18.8946 8.70711 18.7071C8.89464 18.5196 9 18.2652 9 18Z"
                              fill="#131313"/>
                    </svg>
                </button>
            </div>
            <div class="catalog__filter filter">
                <?php
                $APPLICATION->IncludeComponent(
                    "bitrix:catalog.smart.filter",
                    "",
                    array(
                        "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
                        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                        "SECTION_ID" => $arCurSection['ID'],
                        "FILTER_NAME" => $arParams["FILTER_NAME"],
                        "PRICE_CODE" => $arParams["~PRICE_CODE"],
                        "CACHE_TYPE" => $arParams["CACHE_TYPE"],
                        "CACHE_TIME" => $arParams["CACHE_TIME"],
                        "CACHE_GROUPS" => $arParams["CACHE_GROUPS"],
                        "SAVE_IN_SESSION" => "N",
                        "FILTER_VIEW_MODE" => $arParams["FILTER_VIEW_MODE"],
                        "XML_EXPORT" => "N",
                        "SECTION_TITLE" => "NAME",
                        "SECTION_DESCRIPTION" => "DESCRIPTION",
                        'HIDE_NOT_AVAILABLE' => $arParams["HIDE_NOT_AVAILABLE"],
                        "TEMPLATE_THEME" => $arParams["TEMPLATE_THEME"],
                        'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
                        'CURRENCY_ID' => $arParams['CURRENCY_ID'],
                        "SEF_MODE" => $arParams["SEF_MODE"],
                        "SEF_RULE" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["smart_filter"],
                        "SMART_FILTER_PATH" => $arResult["VARIABLES"]["SMART_FILTER_PATH"],
                        "PAGER_PARAMS_NAME" => $arParams["PAGER_PARAMS_NAME"],
                        "INSTANT_RELOAD" => $arParams["INSTANT_RELOAD"],
                    ),
                    $component,
                    array('HIDE_ICONS' => 'Y')
                );
                ?>
                <button class="close-filter">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                              fill="#131313"/>
                    </svg>
                </button>
                <h3 class="filter__title">Фильтры</h3>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Бренд</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend1">
                            <label for="brend1"> <span>Ampliphon</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend2">
                            <label for="brend2"> <span>Oticon</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend3">
                            <label for="brend3"> <span>Signia</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend4">
                            <label for="brend4"> <span>Rexton</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend5">
                            <label for="brend5"> <span>Medel</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend1">
                            <label for="brend1"> <span>Ampliphon</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend2">
                            <label for="brend2"> <span>Oticon</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend3">
                            <label for="brend3"> <span>Signia</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend4">
                            <label for="brend4"> <span>Rexton</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="brend5">
                            <label for="brend5"> <span>Medel</span><span
                                        class="filter-box__item-count">34  </span></label>
                        </li>
                    </ul>
                    <a class="filter__all">Показать все</a>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Тип корпуса</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="type1">
                            <label for="type1"> <span>Заушный</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="type2">
                            <label for="type2"> <span>Заушный с выносным ресивером</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="type3">
                            <label for="type3"> <span>Внутриушной   </span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item" data-count="24">
                            <input class="input-action" type="checkbox" id="type4">
                            <label for="type4">Внутриканальный</label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Степень потери слуха</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="degree1" name="degree">
                            <label for="degree1"> <span>1 степень</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="degree2" name="degree">
                            <label for="degree2"> <span>2 степень</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="degree3" name="degree">
                            <label for="degree3"> <span>3 степень   </span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="degree4" name="degree">
                            <label for="degree4"> <span>4 степень</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Мощность</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" name="power" id="power1">
                            <label for="power1"> <span>Мощные</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" name="power" id="power2">
                            <label for="power2"> <span>Сверхмощные</span><span class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" name="power" id="power3">
                            <label for="power3"> <span>Средней мощности </span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Тип батарейки</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="type5">
                            <label for="type5">10</label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="type6">
                            <label for="type6">13</label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="type7">
                            <label for="type7">312 </label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="type8">
                            <label for="type8">675</label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="type9">
                            <label for="type9">Литий-ионный</label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Особенности</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="char1">
                            <label for="char1"> <span>Компактные и невидимые</span><span class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="char2">
                            <label for="char2"> <span>Простые и эффективные</span><span class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="char3">
                            <label for="char3"> <span>Подзаряжаемые решения   </span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="char4">
                            <label for="char4"> <span>С возможностью подключения</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box filter-box--columns">
                    <h4 class="filter__name">Акустические ситуации</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic1">
                            <label for="acustic1"> <span>Отдых</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic2">
                            <label for="acustic2"> <span>Улица</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic3">
                            <label for="acustic3"> <span>Разговор в компании</span><span class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic4">
                            <label for="acustic4"> <span>Разговор в тишине</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic5">
                            <label for="acustic5"> <span>Совещание</span><span class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic1">
                            <label for="acustic1"> <span>Отдых</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic2">
                            <label for="acustic2"> <span>Улица</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic3">
                            <label for="acustic3"> <span>зговор в компании</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic4">
                            <label for="acustic4"> <span>Разговор в тишине</span><span
                                        class="filter-box__item-count">34</span></label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="acustic5">
                            <label for="acustic5"> <span>Совещание</span><span class="filter-box__item-count">34</span></label>
                        </li>
                    </ul>
                    <a class="filter__all">Показать все</a>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Bluetooth</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="bl1" name="bl">
                            <label for="bl1">Да</label>
                        </li>
                        <li class="filter-box__item">
                            <input class="input-action" type="radio" id="bl2" name="bl">
                            <label for="bl2">Нет</label>
                        </li>
                    </ul>
                </div>
                <div class="filter__box filter-box">
                    <h4 class="filter__name">Скидка</h4>
                    <ul class="filter-box__list">
                        <li class="filter-box__item">
                            <input class="input-action" type="checkbox" id="sale">
                            <label for="sale">Товары со скидкой</label>
                        </li>
                    </ul>
                </div>
                <button class="btn btn--grey btn--m btn--icn btn--close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                              fill="#131313"/>
                    </svg>
                    Очистить фильтр
                </button>
            </div>
            <div class="catalog__box">
                <div class="catalog__sort"><a class="active" href="">Популярные</a><a href="">Дешевле</a><a href="">Дороже</a><a
                            href="">Со скидкой</a></div>
                <select class="mySelect">
                    <option value="">Популярные</option>
                    <option value="">Дешевле</option>
                    <option value="">Дороже</option>
                    <option value="">Со скидкой</option>
                </select>
                <?php $APPLICATION->IncludeComponent(
                    "bitrix:catalog.section",
                    "section",
                    array(
                        "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
                        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                        "ELEMENT_SORT_FIELD" => $arParams["ELEMENT_SORT_FIELD"],
                        "ELEMENT_SORT_ORDER" => $arParams["ELEMENT_SORT_ORDER"],
                        "ELEMENT_SORT_FIELD2" => $arParams["ELEMENT_SORT_FIELD2"],
                        "ELEMENT_SORT_ORDER2" => $arParams["ELEMENT_SORT_ORDER2"],
                        "PROPERTY_CODE" => (isset($arParams["LIST_PROPERTY_CODE"]) ? $arParams["LIST_PROPERTY_CODE"] : []),
                        "PROPERTY_CODE_MOBILE" => $arParams["LIST_PROPERTY_CODE_MOBILE"],
                        "META_KEYWORDS" => $arParams["LIST_META_KEYWORDS"],
                        "META_DESCRIPTION" => $arParams["LIST_META_DESCRIPTION"],
                        "BROWSER_TITLE" => $arParams["LIST_BROWSER_TITLE"],
                        "SET_LAST_MODIFIED" => $arParams["SET_LAST_MODIFIED"],
                        "INCLUDE_SUBSECTIONS" => $arParams["INCLUDE_SUBSECTIONS"],
                        "BASKET_URL" => $arParams["BASKET_URL"],
                        "ACTION_VARIABLE" => $arParams["ACTION_VARIABLE"],
                        "PRODUCT_ID_VARIABLE" => $arParams["PRODUCT_ID_VARIABLE"],
                        "SECTION_ID_VARIABLE" => $arParams["SECTION_ID_VARIABLE"],
                        "PRODUCT_QUANTITY_VARIABLE" => $arParams["PRODUCT_QUANTITY_VARIABLE"],
                        "PRODUCT_PROPS_VARIABLE" => $arParams["PRODUCT_PROPS_VARIABLE"],
                        "FILTER_NAME" => $arParams["FILTER_NAME"],
                        "CACHE_TYPE" => $arParams["CACHE_TYPE"],
                        "CACHE_TIME" => $arParams["CACHE_TIME"],
                        "CACHE_FILTER" => $arParams["CACHE_FILTER"],
                        "CACHE_GROUPS" => $arParams["CACHE_GROUPS"],
                        "SET_TITLE" => $arParams["SET_TITLE"],
                        "MESSAGE_404" => $arParams["~MESSAGE_404"],
                        "SET_STATUS_404" => $arParams["SET_STATUS_404"],
                        "SHOW_404" => $arParams["SHOW_404"],
                        "FILE_404" => $arParams["FILE_404"],
                        "DISPLAY_COMPARE" => $arParams["USE_COMPARE"],
                        "PAGE_ELEMENT_COUNT" => $arParams["PAGE_ELEMENT_COUNT"],
                        "LINE_ELEMENT_COUNT" => $arParams["LINE_ELEMENT_COUNT"],
                        "PRICE_CODE" => $arParams["~PRICE_CODE"],
                        "USE_PRICE_COUNT" => $arParams["USE_PRICE_COUNT"],
                        "SHOW_PRICE_COUNT" => $arParams["SHOW_PRICE_COUNT"],

                        "PRICE_VAT_INCLUDE" => $arParams["PRICE_VAT_INCLUDE"],
                        "USE_PRODUCT_QUANTITY" => $arParams['USE_PRODUCT_QUANTITY'],
                        "ADD_PROPERTIES_TO_BASKET" => (isset($arParams["ADD_PROPERTIES_TO_BASKET"]) ? $arParams["ADD_PROPERTIES_TO_BASKET"] : ''),
                        "PARTIAL_PRODUCT_PROPERTIES" => (isset($arParams["PARTIAL_PRODUCT_PROPERTIES"]) ? $arParams["PARTIAL_PRODUCT_PROPERTIES"] : ''),
                        "PRODUCT_PROPERTIES" => (isset($arParams["PRODUCT_PROPERTIES"]) ? $arParams["PRODUCT_PROPERTIES"] : []),

                        "DISPLAY_TOP_PAGER" => $arParams["DISPLAY_TOP_PAGER"],
                        "DISPLAY_BOTTOM_PAGER" => $arParams["DISPLAY_BOTTOM_PAGER"],
                        "PAGER_TITLE" => $arParams["PAGER_TITLE"],
                        "PAGER_SHOW_ALWAYS" => $arParams["PAGER_SHOW_ALWAYS"],
                        "PAGER_TEMPLATE" => $arParams["PAGER_TEMPLATE"],
                        "PAGER_DESC_NUMBERING" => $arParams["PAGER_DESC_NUMBERING"],
                        "PAGER_DESC_NUMBERING_CACHE_TIME" => $arParams["PAGER_DESC_NUMBERING_CACHE_TIME"],
                        "PAGER_SHOW_ALL" => $arParams["PAGER_SHOW_ALL"],
                        "PAGER_BASE_LINK_ENABLE" => $arParams["PAGER_BASE_LINK_ENABLE"],
                        "PAGER_BASE_LINK" => $arParams["PAGER_BASE_LINK"],
                        "PAGER_PARAMS_NAME" => $arParams["PAGER_PARAMS_NAME"],
                        "LAZY_LOAD" => $arParams["LAZY_LOAD"],
                        "MESS_BTN_LAZY_LOAD" => $arParams["~MESS_BTN_LAZY_LOAD"],
                        "LOAD_ON_SCROLL" => $arParams["LOAD_ON_SCROLL"],

                        "OFFERS_CART_PROPERTIES" => (isset($arParams["OFFERS_CART_PROPERTIES"]) ? $arParams["OFFERS_CART_PROPERTIES"] : []),
                        "OFFERS_FIELD_CODE" => $arParams["LIST_OFFERS_FIELD_CODE"],
                        "OFFERS_PROPERTY_CODE" => (isset($arParams["LIST_OFFERS_PROPERTY_CODE"]) ? $arParams["LIST_OFFERS_PROPERTY_CODE"] : []),
                        "OFFERS_SORT_FIELD" => $arParams["OFFERS_SORT_FIELD"],
                        "OFFERS_SORT_ORDER" => $arParams["OFFERS_SORT_ORDER"],
                        "OFFERS_SORT_FIELD2" => $arParams["OFFERS_SORT_FIELD2"],
                        "OFFERS_SORT_ORDER2" => $arParams["OFFERS_SORT_ORDER2"],
                        "OFFERS_LIMIT" => (isset($arParams["LIST_OFFERS_LIMIT"]) ? $arParams["LIST_OFFERS_LIMIT"] : 0),

                        "SECTION_ID" => $arResult["VARIABLES"]["SECTION_ID"],
                        "SECTION_CODE" => $arResult["VARIABLES"]["SECTION_CODE"],
                        "SECTION_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["section"],
                        "DETAIL_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["element"],
                        "USE_MAIN_ELEMENT_SECTION" => $arParams["USE_MAIN_ELEMENT_SECTION"],
                        'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
                        'CURRENCY_ID' => $arParams['CURRENCY_ID'],
                        'HIDE_NOT_AVAILABLE' => $arParams["HIDE_NOT_AVAILABLE"],
                        'HIDE_NOT_AVAILABLE_OFFERS' => $arParams["HIDE_NOT_AVAILABLE_OFFERS"],

                        'LABEL_PROP' => $arParams['LABEL_PROP'],
                        'LABEL_PROP_MOBILE' => $arParams['LABEL_PROP_MOBILE'],
                        'LABEL_PROP_POSITION' => $arParams['LABEL_PROP_POSITION'] ?? '',
                        'ADD_PICT_PROP' => $arParams['ADD_PICT_PROP'],
                        'PRODUCT_DISPLAY_MODE' => $arParams['PRODUCT_DISPLAY_MODE'],
                        'PRODUCT_BLOCKS_ORDER' => $arParams['LIST_PRODUCT_BLOCKS_ORDER'],
                        'PRODUCT_ROW_VARIANTS' => $arParams['LIST_PRODUCT_ROW_VARIANTS'],
                        'ENLARGE_PRODUCT' => $arParams['LIST_ENLARGE_PRODUCT'],
                        'ENLARGE_PROP' => isset($arParams['LIST_ENLARGE_PROP']) ? $arParams['LIST_ENLARGE_PROP'] : '',
                        'SHOW_SLIDER' => $arParams['LIST_SHOW_SLIDER'],
                        'SLIDER_INTERVAL' => isset($arParams['LIST_SLIDER_INTERVAL']) ? $arParams['LIST_SLIDER_INTERVAL'] : '',
                        'SLIDER_PROGRESS' => isset($arParams['LIST_SLIDER_PROGRESS']) ? $arParams['LIST_SLIDER_PROGRESS'] : '',

                        'OFFER_ADD_PICT_PROP' => $arParams['OFFER_ADD_PICT_PROP'],
                        'OFFER_TREE_PROPS' => (isset($arParams['OFFER_TREE_PROPS']) ? $arParams['OFFER_TREE_PROPS'] : []),
                        'PRODUCT_SUBSCRIPTION' => $arParams['PRODUCT_SUBSCRIPTION'],
                        'SHOW_DISCOUNT_PERCENT' => $arParams['SHOW_DISCOUNT_PERCENT'],
                        'DISCOUNT_PERCENT_POSITION' => $arParams['DISCOUNT_PERCENT_POSITION'],
                        'SHOW_OLD_PRICE' => $arParams['SHOW_OLD_PRICE'],
                        'SHOW_MAX_QUANTITY' => $arParams['SHOW_MAX_QUANTITY'],
                        'MESS_SHOW_MAX_QUANTITY' => (isset($arParams['~MESS_SHOW_MAX_QUANTITY']) ? $arParams['~MESS_SHOW_MAX_QUANTITY'] : ''),
                        'RELATIVE_QUANTITY_FACTOR' => (isset($arParams['RELATIVE_QUANTITY_FACTOR']) ? $arParams['RELATIVE_QUANTITY_FACTOR'] : ''),
                        'MESS_RELATIVE_QUANTITY_MANY' => (isset($arParams['~MESS_RELATIVE_QUANTITY_MANY']) ? $arParams['~MESS_RELATIVE_QUANTITY_MANY'] : ''),
                        'MESS_RELATIVE_QUANTITY_FEW' => (isset($arParams['~MESS_RELATIVE_QUANTITY_FEW']) ? $arParams['~MESS_RELATIVE_QUANTITY_FEW'] : ''),
                        'MESS_BTN_BUY' => (isset($arParams['~MESS_BTN_BUY']) ? $arParams['~MESS_BTN_BUY'] : ''),
                        'MESS_BTN_ADD_TO_BASKET' => (isset($arParams['~MESS_BTN_ADD_TO_BASKET']) ? $arParams['~MESS_BTN_ADD_TO_BASKET'] : ''),
                        'MESS_BTN_SUBSCRIBE' => (isset($arParams['~MESS_BTN_SUBSCRIBE']) ? $arParams['~MESS_BTN_SUBSCRIBE'] : ''),
                        'MESS_BTN_DETAIL' => (isset($arParams['~MESS_BTN_DETAIL']) ? $arParams['~MESS_BTN_DETAIL'] : ''),
                        'MESS_NOT_AVAILABLE' => $arParams['~MESS_NOT_AVAILABLE'] ?? '',
                        'MESS_NOT_AVAILABLE_SERVICE' => $arParams['~MESS_NOT_AVAILABLE_SERVICE'] ?? '',
                        'MESS_BTN_COMPARE' => (isset($arParams['~MESS_BTN_COMPARE']) ? $arParams['~MESS_BTN_COMPARE'] : ''),

                        'USE_ENHANCED_ECOMMERCE' => (isset($arParams['USE_ENHANCED_ECOMMERCE']) ? $arParams['USE_ENHANCED_ECOMMERCE'] : ''),
                        'DATA_LAYER_NAME' => (isset($arParams['DATA_LAYER_NAME']) ? $arParams['DATA_LAYER_NAME'] : ''),
                        'BRAND_PROPERTY' => (isset($arParams['BRAND_PROPERTY']) ? $arParams['BRAND_PROPERTY'] : ''),

                        'TEMPLATE_THEME' => (isset($arParams['TEMPLATE_THEME']) ? $arParams['TEMPLATE_THEME'] : ''),
                        "ADD_SECTIONS_CHAIN" => "N",
                        'ADD_TO_BASKET_ACTION' => $basketAction,
                        'SHOW_CLOSE_POPUP' => isset($arParams['COMMON_SHOW_CLOSE_POPUP']) ? $arParams['COMMON_SHOW_CLOSE_POPUP'] : '',
                        'COMPARE_PATH' => $arResult['FOLDER'] . $arResult['URL_TEMPLATES']['compare'],
                        'COMPARE_NAME' => $arParams['COMPARE_NAME'],
                        'USE_COMPARE_LIST' => 'Y',
                        'BACKGROUND_IMAGE' => (isset($arParams['SECTION_BACKGROUND_IMAGE']) ? $arParams['SECTION_BACKGROUND_IMAGE'] : ''),
                        'COMPATIBLE_MODE' => (isset($arParams['COMPATIBLE_MODE']) ? $arParams['COMPATIBLE_MODE'] : ''),
                        'DISABLE_INIT_JS_IN_COMPONENT' => (isset($arParams['DISABLE_INIT_JS_IN_COMPONENT']) ? $arParams['DISABLE_INIT_JS_IN_COMPONENT'] : '')
                    ),
                    $component
                ); ?>
                <div class="catalog__text text-block">
                    <h3 class="text-block__title"><?php $APPLICATION->ShowTitle(false); ?></h3>
                    <div class="text-block__text"><?php $APPLICATION->ShowProperty('description');?></div>
                </div>
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
    'coderoom:catalog.breadcrumbs',
    '.default',
    [
        'SECTIONS_CODE' => $arResult['VARIABLES']['SECTION_CODE_PATH'],
    ]
); ?>
