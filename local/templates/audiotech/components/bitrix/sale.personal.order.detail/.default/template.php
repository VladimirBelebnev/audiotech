<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Sale\Internals\StatusLangTable;

/** @global CMain $APPLICATION */
/** @var array $arParams */
/** @var array $arResult */
/** @var string $templateFolder */

$arStatus = StatusLangTable::getList([
    'order' => [
        'STATUS.SORT' => 'ASC'
    ],
    'filter' => [
        'STATUS.TYPE' => 'O',
        'LID'=>LANGUAGE_ID
    ],
    'select' => [
        'STATUS_ID',
        'NAME',
        'DESCRIPTION'
    ],
])->fetchAll();
?>
<section class="orders">
    <div class="_container">
        <h1 class="title-page">Заказ №<?php echo $arResult['ID']; ?></h1>
        <div class="orders__wrap">
            <div class="orders__content">
                <div class="orders__block">
                    <h3 class="title-block orders__title">Статус заказа</h3>
                    <div class="orders__status orders-status">
                        <div class="orders-status__states">
                            <?php $i = 1; ?>
                            <?php foreach ($arStatus as $arItem) { ?>
                                <div class="orders-status__tracking <?php echo $i == 1 ? 'orders-status__tracking--completed' : ''; ?>">
                                    <div class="orders-status__state"><?php echo $i; ?></div>
                                    <div class="orders-status__block">
                                        <span><?php echo $arItem['NAME']; ?></span><span><?php echo $arResult['DATE_INSERT_FORMATED']; ?></span>
                                    </div>
                                </div>
                                <?php $i++; ?>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <div class="orders__block">
                    <h3 class="title-block orders__title">Состав заказа</h3>
                    <div class="table table--orders">
                        <table class="table__wrapper table__wrapper--resp">
                            <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Кол-во</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach ($arResult['BASKET'] as $arItem) { ?>
                                <tr>
                                    <td>
                                        <span class="table__title-mobile">Товар</span><span><?php echo $arItem['NAME']; ?></span>
                                    </td>
                                    <td>
                                        <span class="table__title-mobile">Цена</span><span><?php echo number_format($arItem['BASE_PRICE'], 0, '', ' '); ?> ₸</span>
                                    </td>
                                    <td>
                                        <span class="table__title-mobile">Кол-во</span><span><?php echo $arItem['QUANTITY']; ?></span>
                                    </td>
                                    <td>
                                        <span class="table__title-mobile">Сумма</span><span><?php echo number_format($arItem['BASE_PRICE'] * $arItem['QUANTITY'], 0, '', ' '); ?> ₸</span>
                                    </td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="orders__block delivery-block">
                    <h3 class="title-block orders__title">Доставка и оплата</h3>
                    <div class="delivery-block__wrap">
                        <div class="orders-block__col">
                            <h4 class="orders-block__title"><?php echo $arResult['DELIVERY']['NAME']; ?></h4>
                            <div class="delivery-block__status"><span>Статус</span><span>Передан в доставку</span><a
                                        href="">Проверить</a></div>
                        </div>
                        <div class="orders-block__col">
                            <h4 class="orders-block__title">
                                Оплата <?php echo $arResult['PAY_SYSTEM']['NAME'] == 'Онлайн' ? mb_strtolower($arResult['PAY_SYSTEM']['NAME']) : ''; ?></h4>
                            <?php if ($arResult['PAY_SYSTEM']['NAME'] == 'Онлайн') { ?>
                                <div class="delivery-block__status"><span>Статус</span><span>...</span></div>
                            <?php } else { ?>
                                <div class="delivery-block__status"><span>Статус</span><span><?php echo $arResult['PAY_SYSTEM']['NAME']; ?></span></div>
                            <?php } ?>
                        </div>
                    </div>
                    <?php if ($arResult['LOCATION'] == 'Город') { ?>
                    <div class="delivery-block__footer">
                        <span>Адрес</span><span><?php echo $arResult['LOCATION']['VALUE']; ?></span>
                        <?php } else { ?>
                        <?php foreach ($arResult['ORDER_PROPS'] as $arProp) { ?>
                        <?php if ($arProp['NAME'] == 'Город') { ?>
                        <div class="delivery-block__footer">
                            <span>Адрес</span><span>г. <?php echo $arProp['VALUE']; ?></span>
                            <?php } ?>
                            <?php } ?>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="orders__block">
                        <h3 class="title-block orders__title">Получатель</h3>
                        <?php foreach ($arResult['ORDER_PROPS'] as $arProp) { ?>
                            <?php if ($arProp['NAME'] == 'ФИО') { ?>
                                <h4 class="orders-block__title"><?php echo $arProp['VALUE']; ?></h4>
                            <?php } ?>
                        <?php } ?>
                        <ul class="orders-block__list">
                            <li>
                                <?php foreach ($arResult['ORDER_PROPS'] as $arProp) { ?>
                                    <?php if ($arProp['NAME'] == 'Телефон') { ?>
                                        <label class="label" for="">Телефон</label>
                                        <span><?php echo $arProp['VALUE']; ?></span>
                                    <?php } ?>
                                <?php } ?>
                            </li>
                            <li>
                                <?php foreach ($arResult['ORDER_PROPS'] as $arProp) { ?>
                                    <?php if ($arProp['NAME'] == 'Почта') { ?>
                                        <label class="label" for="">Электронная почта</label>
                                        <span><?php echo $arProp['VALUE']; ?></span>
                                    <?php } ?>
                                <?php } ?>
                            </li>
                        </ul>
                    </div>
                    <div class="orders__block">
                        <h3 class="title-block orders__title">Комментарий к заказу</h3>
                        <textarea class="delivery-block__text"
                                  disabled><?php echo $arResult['USER_DESCRIPTION']; ?></textarea>
                    </div>
                    <a class="btn btn--red btn--icn btn--l" href="/personal/orders/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18H20M4 6H20H4ZM4 10H20H4ZM4 14H20H4Z" stroke="white" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Назад к списку</a>
                </div>
                <div class="aside-box">
                    <h2 class="section-title">Ваш заказ</h2>
                    <ul class="aside-box__list">
                        <li class="aside-box__item"><span class="aside-box__text">Сумма товаров</span><span
                                    class="aside-box__text"><?php echo number_format($arResult['BASE_PRODUCT_SUM'], 0, '', ' '); ?> ₸</span>
                        </li>
                        <li class="aside-box__item"><span
                                    class="aside-box__text"><?php echo $arResult['DELIVERY']['NAME']; ?></span><span
                                    class="aside-box__text">Бесплатно</span></li>
                        <li class="aside-box__item"><span class="aside-box__text strong">Итого</span><span
                                    class="aside-box__text strong"><?php echo number_format($arResult['BASE_PRODUCT_SUM'], 0, '', ' '); ?> ₸</span>
                        </li>
                    </ul>
                    <?php $i = 0; ?>
                    <?php $a = 0; ?>
                    <button class="btn btn--red btn--icn btn--l" onclick="addProductsToCart([<?php foreach ($arResult['BASKET'] as $arItem) {
                        if ($i != 0) echo ', ';
                        echo $arItem['PRODUCT_ID'];
                        $i++;
                    } ?>], [<?php foreach ($arResult['BASKET'] as $arItem) {
                        if ($a != 0) echo ', ';
                        echo $arItem['QUANTITY'];
                        $a++;
                    } ?>])">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.919 15H15.5H19.919Z" fill="white"/>
                            <path d="M4.5 3.99999V8.99999H5.082M5.082 8.99999C5.74585 7.35812 6.93568 5.9829 8.46503 5.08985C9.99438 4.1968 11.7768 3.8364 13.533 4.06513C15.2891 4.29386 16.9198 5.09878 18.1694 6.35377C19.419 7.60875 20.2168 9.24285 20.438 11M5.082 8.99999H9.5M20.5 20V15H19.919M19.919 15C19.2542 16.6409 18.064 18.015 16.5348 18.9073C15.0056 19.7995 13.2237 20.1595 11.4681 19.9309C9.71246 19.7022 8.0822 18.8979 6.83253 17.6437C5.58287 16.3896 4.78435 14.7564 4.562 13M19.919 15H15.5"
                                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Повторить заказ
                    </button>
                </div>
            </div>
        </div>
</section>
