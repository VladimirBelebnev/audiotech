<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\Elements\ElementNewsTable;
use \Bitrix\Iblock\SectionTable;

class NewsSlider extends \CBitrixComponent
{
    private $iBlockID = 8;
    private $iCacheTime = 3600000;
    private $sCacheId = 'NewsSlider';
    private $sCachePath = 'NewsSlider/';

    public function executeComponent()
    {
        $obCache = new CPHPCache;

        if ($obCache->initCache($this->iCacheTime, $this->sCacheId, $this->sCachePath)) {
            $vars = $obCache->GetVars();

            $this->arResult = $vars['arResult'];
        } else if ($obCache->StartDataCache()) {
            $this->arResult['ITEMS'] = $this->getItems();

            $obCache->EndDataCache([
                'arResult' => $this->arResult,
            ]);
        }

        $this->includeComponentTemplate();
    }

    private function getItems ()
    {
        $arItems = ElementNewsTable::getList([
            'select' => [
                'ID',
                'NAME',
                'TIMESTAMP_X',
                'CODE',
                'PREVIEW_PICTURE',
                'IBLOCK_SECTION_ID',
                'PREVIEW_TEXT'
            ],
            'limit' => 4,
            'filter' => [
                '!ID' => $this->arParams['ELEMENT_ID'],
            ]
        ])->fetchAll();

        $arSectionsIDs = [];

        foreach ($arItems as $arItem)
        {
            $arSectionsIDs[] = $arItem['IBLOCK_SECTION_ID'];
        }

        $arSections = SectionTable::getList([
            'select' => [
                'ID',
                'CODE',
            ],
            'filter' => [
                'IBLOCK_ID' => $this->iBlockID,
                'DEPTH_LEVEL' => 1,
                '=ID' => $arSectionsIDs,
            ],
        ])->fetchAll();

        $arNewItems = [];

        foreach ($arItems as $arItem)
        {
            $arNewItems[$arItem['ID']] = $arItem;

            foreach ($arSections as $arSection)
            {
                if ($arItem['IBLOCK_SECTION_ID'] == $arSection['ID'])
                {
                    $arNewItems[$arItem['ID']]['SECTION_CODE'] = $arSection['CODE'];
                }
            }
        }

        return $arNewItems;
    }
}