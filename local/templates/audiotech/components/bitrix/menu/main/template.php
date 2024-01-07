<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

global $APPLICATION;

$aMenuLinks = $APPLICATION->IncludeComponent(
    "bitrix:menu.sections",
    "",
    [
        'ID' => $_REQUEST["ELEMENT_ID"],
        'IBLOCK_TYPE' => 'menu',
        'IBLOCK_ID' => 2,
        'DEPTH_LEVEL' => 3,
        'SECTION_URL' => '/',
        'CACHE_TIME' => 3600
    ]
);
?>

<pre>
    <?php print_r($aMenuLinks); ?>
</pre>