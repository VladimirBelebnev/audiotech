<?php

namespace Coderoom\Main\Order;

use Bitrix\Main\Context,
    Bitrix\Currency\CurrencyManager,
    Bitrix\Sale\Order,
    Bitrix\Sale\Basket,
    Bitrix\Sale\Delivery,
    Bitrix\Sale\PaySystem,
    Bitrix\Sale\Fuser,
    Coderoom\Main\Cart\ListCart;

class CreateOrder
{
    public function createOrder (array $array) : string
    {
        global $USER;

        $obCartList = new ListCart;
        $request = Context::getCurrent()->getRequest();

        $sName = $array['NAME'];
        $sPhone = $array['PHONE'];
        $sEmail = $array['EMAIL'];
        $sCity = $array['CITY'];
        $sLocation = $array['LOCATION'];
        $sDate = $array['DATE'];
        $sMessage = $array['MESSAGE'];
        $iDelivery = $array['DELIVERY'];
        $iPay = $array['PAY'];

        $siteId = Context::getCurrent()->getSite();

        $order = Order::create($siteId, $USER->isAuthorized() ? $USER->GetID() : Fuser::getId());
        $order->setPersonTypeId(1);

        $basket = Basket::loadItemsForFUser($USER->isAuthorized() ? $USER->GetID() : Fuser::getId(), Context::getCurrent()->getSite())->getOrderableItems();
        $order->setBasket($basket);

        $shipmentCollection = $order->getShipmentCollection();
        $shipment = $shipmentCollection->createItem();
        $service = Delivery\Services\Manager::getById($iDelivery);
        $shipment->setFields(array(
            'DELIVERY_ID' => $service['ID'],
            'DELIVERY_NAME' => $service['NAME'],
        ));

        $paymentCollection = $order->getPaymentCollection();
        $payment = $paymentCollection->createItem();
        $paySystemService = PaySystem\Manager::getObjectById($iPay);
        $payment->setFields(array(
            'PAY_SYSTEM_ID' => $paySystemService->getField("PAY_SYSTEM_ID"),
            'PAY_SYSTEM_NAME' => $paySystemService->getField("NAME"),
        ));

        function getPropertyByCode($propertyCollection, $code) {
            foreach($propertyCollection as $property) {
                if($property->getField("CODE") == $code)
                    return $property;
            }
        }

        $propertyCollection = $order->getPropertyCollection();
//
//        $nameProp = $propertyCollection->getPayerName();
//        $nameProp->setValue($sName);
//
//        $phoneProp = $propertyCollection->getPhone();
//        $phoneProp->setValue($sPhone);
//
//        $emailProp = $propertyCollection->getEmail();
//        $emailProp->setValue($sEmail);
//
        $nameProperty = getPropertyByCode($propertyCollection, 'NAME');
        $nameProperty->setValue($sName);

        $phoneProperty = getPropertyByCode($propertyCollection, 'PHONE');
        $phoneProperty->setValue($sPhone);

//        $emailProperty = getPropertyByCode($propertyCollection, 'EMAIL');
//        $emailProperty->setValue($sEmail);

//        $cityProperty = getPropertyByCode($propertyCollection, 'CITY');
//        $cityProperty->setValue($sCity);
//
//        $locationProperty = getPropertyByCode($propertyCollection, 'LOCATION');
//        $locationProperty->setValue($sLocation);
//
//        $dateProperty = getPropertyByCode($propertyCollection, 'DATE');
//        $dateProperty->setValue($sDate);
//
//        $messageProperty = getPropertyByCode($propertyCollection, 'MESSAGE');
//        $messageProperty->setValue($sMessage);

        $order->doFinalAction(true);
        $result = $order->save();
        $orderId = $order->getId();

        $obCartList->deleteAllProducts();

        return 'ok';
    }
}