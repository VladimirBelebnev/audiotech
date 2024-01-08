<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\SectionTable;

class CatalogBreadcrumbs extends \CBitrixComponent
{
    public function executeComponent()
    {
        $arSectionsCode = $this->getSectionsCode();
        $iCodeCount = count($arSectionsCode);
        $arSectionsWithInfo = $this->getSectionsInfo($arSectionsCode);
        $this->setCatalogBreadcrumbs($arSectionsWithInfo, $iCodeCount);
        $this->includeComponentTemplate();
    }

    private function getSectionsCode () : array
    {
        return explode('/', $this->arParams['SECTIONS_CODE']);
    }

    private function getSectionsInfo ($arSectionsCode) : array
    {
        return SectionTable::getList([
            'select' => [
                'ID',
                'NAME',
                'CODE'
            ],
            'filter' => [
                '=CODE' => $arSectionsCode,
            ],
        ])->fetchAll();
    }

    private function setCatalogBreadcrumbs ($arSectionsWithInfo) : void
    {
        global $APPLICATION;

        foreach ($arSectionsWithInfo as $arSection)
        {
            $APPLICATION->AddChainItem($arSection['NAME'], '/catalog/' . $arSection['CODE'] . '/');
        }
    }
}