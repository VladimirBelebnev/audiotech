<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Context;
use Bitrix\Sale;
use Bitrix\Currency\CurrencyManager;

$request = Context::getCurrent()->getRequest();
$productId = $request->get('id');
$quantity = $request->get('quantity');
$event = $request->get('event');

$basket = Sale\Basket::loadItemsForFUser(Sale\Fuser::getId(), Context::getCurrent()->getSite());

if ($item = $basket->getExistsItem('catalog', $productId)) {
    $item->setField('QUANTITY', $quantity + $event);
}
else {
    $item = $basket->createItem('catalog', $productId);
    $item->setFields([
        'QUANTITY' => $quantity,
        'CURRENCY' => CurrencyManager::getBaseCurrency(),
        'LID' => Context::getCurrent()->getSite(),
        'PRODUCT_PROVIDER_CLASS' => 'CCatalogProductProvider',
    ]);
}
$basket->save();

echo 'ok';