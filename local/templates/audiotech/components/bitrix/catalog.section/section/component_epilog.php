<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

/**
 * @var array $arParams
 * @var array $arResult
 * @var array $templateData
 * @var string $templateFolder
 * @var CatalogSectionComponent $component
 */

use \Bitrix\Iblock\Elements\ElementCatalogTable;
use \Bitrix\Iblock\SectionTable;

global $APPLICATION;

$arSection = SectionTable::getList([
    'select' => [
        'ID',
        'DESCRIPTION'
    ],
    'filter' => [
        '=ID' => $arResult['ID'],
    ],
])->fetchAll();

$iElementCount = CIBlockSection::GetSectionElementsCount($arResult['ID']);

$APPLICATION->SetPageProperty('description', htmlspecialchars_decode($arSection[0] ['DESCRIPTION']));
$APPLICATION->SetPageProperty('element_count', $iElementCount);