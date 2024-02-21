<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Личный кабинет');

global $USER;

if (!$USER->IsAuthorized()) LocalRedirect('/');
?>

<section class="personal">
    <div class="_container">
        <h1 class="title-page">Личный кабинет</h1>
    </div>
    <div class="_container _container--mode">
        <div class="tabs">
            <div class="tabs-wrap">
                <div class="tabs__nav tabs__nav--personal">
                    <a href="/personal/orders/" class="tabs__btn">Мои заказы</a>
                    <a href="/personal/favorites/" class="tabs__btn">Избранное</a>
                    <a href="/personal/" class="tabs__btn active">Профиль</a>
                    <a class="personal__exit" href="/?logout=yes&<?php echo bitrix_sessid_get(); ?>">Выйти </a>
                </div>
            </div>
            <div class="tabs__content">
                <div class="tabs__pane show">
                    <?php $APPLICATION->IncludeComponent(
                        'coderoom:personal',
                        '.default',
                        []
                    ); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
