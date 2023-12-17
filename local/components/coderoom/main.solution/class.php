<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\Elements\ElementBannerTable;

class MainSlider extends \CBitrixComponent
{
    public function executeComponent()
    {
        $this->arResult['ITEMS'] = $this->getItems();
        $this->includeComponentTemplate();
    }

    private function getItems ()
    {
        return ElementBannerTable::getList([
            'select' => [
                'ID',
                'NAME',
                'IMG_' => 'IMG',
                'LINK_' => 'LINK',
                'SUBTITLE_' => 'SUBTITLE',
                'BTN_TEXT_' => 'BTN_TEXT'
            ],
        ])->fetchAll();
    }
}