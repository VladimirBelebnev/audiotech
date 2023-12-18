<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\SectionTable;
use \Bitrix\Main\Application;
use \Bitrix\Main\Web\Uri;

class AboutNewsSection extends \CBitrixComponent
{
    private $iBlockID = 8;

    public function executeComponent()
    {
        $arItems = $this->getItems();

        $arItems = $this->getActiveLink($arItems);
        $this->arResult['ITEMS'] = $arItems;

        $this->includeComponentTemplate();
    }

    private function getItems ()
    {
        return SectionTable::getList([
            'select' => [
                'ID',
                'NAME',
                'CODE',
            ],
            'filter' => [
                'IBLOCK_ID' => $this->iBlockID,
                'DEPTH_LEVEL' => 1,
            ],
        ])->fetchAll();
    }

    private function getActiveLink ($arItems)
    {
        $obRequest = Application::getInstance()->getContext()->getRequest();
        $uri = new Uri($obRequest->getRequestUri());

        $newArItems = [];

        $newArItems[0]['NAME'] = 'Все';
        $newArItems[0]['CODE'] = '';
        $allLinkActive = 'Y';

        foreach ($arItems as $arItem)
        {
            if (stripos($uri, $arItem['CODE']))
            {
                $allLinkActive = 'N';
                $arItem['LINK_ACTIVE'] = 'Y';
            }

            $newArItems[] = $arItem;
        }

        $newArItems[0]['LINK_ACTIVE'] = $allLinkActive;

        return $newArItems;
    }
}