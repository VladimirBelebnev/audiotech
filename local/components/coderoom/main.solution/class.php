<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\Elements\ElementSolutionTable;

class MainSolution extends \CBitrixComponent
{
    public function executeComponent()
    {
        $this->arResult['ITEMS'] = $this->getItems();
        $this->includeComponentTemplate();
    }

    private function getItems ()
    {
        return ElementSolutionTable::getList([
            'select' => [
                'ID',
                'NAME',
                'LINK_' => 'LINK',
                'IMG_' => 'IMG',
                'SUBTITLE_' => 'SUBTITLE',
            ],
        ])->fetchAll();
    }
}