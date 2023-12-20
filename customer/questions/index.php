<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Вопрос-ответ');
$APPLICATION->AddChainItem('Покупателям', '/customer/');
$APPLICATION->AddChainItem('Вопрос-ответ', '/customer/questions/');
?>

<section class="questions">
    <div class="_container">
        <h1 class="title-page"><?php $APPLICATION->ShowTitle(false); ?></h1>
    </div>
    <?php $APPLICATION->IncludeComponent(
        'coderoom:customer.questions',
        '.default',
        []
    ); ?>
</section>

<?php $APPLICATION->IncludeComponent(
    'coderoom:main.offers',
    '.default',
    []
); ?>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
