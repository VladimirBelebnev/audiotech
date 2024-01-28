<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

use Bitrix\Main\Loader;

/**
 * @var array $templateData
 * @var array $arParams
 * @var string $templateFolder
 * @var array $arResult
 * @global CMain $APPLICATION
 */

global $APPLICATION;

$APPLICATION->AddChainItem($arResult['SECTION']['PATH'][0]['NAME'], $arResult['SECTION']['PATH'][0]['SECTION_PAGE_URL']);