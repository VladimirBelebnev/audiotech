<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Iblock\Elements\ElementAboutMapTable;

class AboutMap extends \CBitrixComponent
{
    private $iCacheTime = 3600000;
    private $sCacheId = 'AboutMap';
    private $sCachePath = 'AboutMap/';

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
        return ElementAboutMapTable::getList([
            'select' => [
                'ID',
                'NAME',
                'COORDINATES_' => 'COORDINATES',
                'ADDRESS_' => 'ADDRESS',
                'PHONE_' => 'PHONE',
                'EMAIL_' => 'EMAIL',
                'TIME_' => 'TIME'
            ],
        ])->fetchAll();
    }
}