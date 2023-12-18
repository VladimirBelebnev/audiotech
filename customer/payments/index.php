<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Покупка и оплата');
$APPLICATION->AddChainItem('Покупателям', '/customer/');
$APPLICATION->AddChainItem('Покупка и оплата', '/customer/payments/');
?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:customer.payments',
    '.default',
    []
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:customer.methods',
    '.default',
    []
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:customer.questions.pay',
    '.default',
    []
); ?>

<?php $APPLICATION->IncludeComponent(
    'coderoom:main.offers',
    '.default',
    []
); ?>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
