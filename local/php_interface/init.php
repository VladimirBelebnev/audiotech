<?php

use \Bitrix\Main\Loader;

Loader::includeModule('iblock');
Loader::includeModule('catalog');
Loader::IncludeModule('sale');
Loader::IncludeModule('coderoom.main');

AddEventHandler("iblock", "OnBeforeIBlockElementUpdate","DoNotUpdate");
function DoNotUpdate(&$arFields)
{
    if ($_REQUEST['mode'] == 'import') {
		unset($arFields['ACTIVE']);
        unset($arFields['PREVIEW_TEXT']);
        unset($arFields['DETAIL_TEXT']);
    }
}

AddEventHandler("iblock", "OnBeforeIBlockElementAdd","DoNotAdd");
function DoNotAdd(&$arFields)
{
    if ($_REQUEST['mode'] == 'import') {
		unset($arFields['ACTIVE']);
        unset($arFields['PREVIEW_TEXT']);
        unset($arFields['DETAIL_TEXT']);
    }
}