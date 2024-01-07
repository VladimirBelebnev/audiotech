<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CBitrixComponentTemplate $this
 * @var CatalogElementComponent $component
 */

use \Bitrix\Iblock\Elements\ElementCatalogTable;

$component = $this->getComponent();
$arParams = $component->applyTemplateModifications();

// Слайдер
$arPhotos = [];

$arPhotos[] = [
    'THUMB' => CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], ['width' => 95, 'height' => 95]),
    'BIG' => $arResult['DETAIL_PICTURE']['SRC'],
    'MAIN' => CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], ['width' => 600, 'height' => 600]),
];

foreach ($arResult['PROPERTIES']['MORE_PHOTO']['VALUE'] as $iPhotoID)
{
    $arPhotos[] = [
        'THUMB' => CFile::ResizeImageGet($iPhotoID, ['width' => 95, 'height' => 95]),
        'BIG' => CFile::GetPath($iPhotoID),
        'MAIN' => CFile::ResizeImageGet($iPhotoID, ['width' => 600, 'height' => 600]),
    ];
}

$arResult['SLIDER'] = $arPhotos;

// Файлы
if ($arResult['PROPERTIES']['FILES']['VALUE'])
{
    $arFiles = [];

    foreach ($arResult['PROPERTIES']['FILES']['VALUE'] as $iFileID)
    {
        $arFiles[] = CFile::GetFileArray($iFileID);
    }

    $arResult['FILES'] = $arFiles;
}

// Привязанные товары
if ($arResult['PROPERTIES']['ADD_ELEMENTS']['VALUE'])
{
    $obItems = ElementCatalogTable::getList([
        'select' => [
            'ID',
            'NAME',
            'CODE',
            'IBLOCK_ID',
            'IBLOCK_SECTION_ID',
            'PREVIEW_PICTURE',
            'DETAIL_PAGE_URL' => 'IBLOCK.DETAIL_PAGE_URL'
        ],
        'filter' => [
            '=ID' => $arResult['PROPERTIES']['ADD_ELEMENTS']['VALUE'],
        ]
    ]);

    $arItems = [];

    // Детальная страница
    while ($arItem  =  $obItems ->fetch())
    {
        $arItem['DETAIL_PAGE_URL'] = CIBlock::ReplaceDetailUrl($arItem['DETAIL_PAGE_URL'],  $arItem ,  false ,  'E');
        $arItems[$arItem['ID']] = $arItem;
    }

    // Цена
    $obPrices = CPrice::GetList(
        [],
        ['PRODUCT_ID' => $arResult['PROPERTIES']['ADD_ELEMENTS']['VALUE']]
    );

    while ($arPrices = $obPrices->fetch())
    {
        $arItems[$arPrices['PRODUCT_ID']]['PRICE'] = $arPrices;
    }

    // Получение раздела
    $arSectionNames = [];

    foreach ($arItems as $arItem)
    {
        $navChain = CIBlockSection::GetNavChain($arParams["IBLOCK_ID"], $arItem["IBLOCK_SECTION_ID"]);

        while ($arNav = $navChain->GetNext())
        {
            $dbList = CIBlockSection::GetList(
                [$by => $order],
                $arFilter = [
                    "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                    "ID" => $arNav["ID"]
                ],
                true,
                $arSelect = [
                    'ID',
                    'NAME'
                ]
            );

            while ($arInfo = $dbList->Fetch())
            {
                $arSectionNames[$arItem['ID']] = $arInfo['NAME'];
            }

            break;
        }
    }

    foreach ($arItems as $arItem)
    {
        foreach ($arSectionNames as $itemID => $sectionName)
        {
            if ($itemID == $arItem['ID'])
            {
                $arItems[$arItem['ID']]['SECTION'] = $sectionName;
            }
        }
    }

    $arResult['ADD_ELEMENTS'] = $arItems;
}