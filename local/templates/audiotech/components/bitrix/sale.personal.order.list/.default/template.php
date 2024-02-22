<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$from = strtotime($_GET['from']);
$to = strtotime($_GET['to']);
?>
<section class="personal">
    <div class="_container">
        <h1 class="title-page">Личный кабинет</h1>
    </div>
    <div class="_container _container--mode">
        <div class="tabs">
            <div class="tabs-wrap">
                <div class="tabs__nav tabs__nav--personal">
                    <a href="/personal/orders/" class="tabs__btn active">Мои заказы</a>
                    <a href="/personal/favorites/" class="tabs__btn">Избранное</a>
                    <a href="/personal/" class="tabs__btn">Профиль</a>
                    <a class="personal__exit" href="/?logout=yes&<?php echo bitrix_sessid_get(); ?>">Выйти </a>
                </div>
            </div>
            <div class="tabs__content">
                <div class="tabs__pane show">
                    <div class="tabs__pane-wrap">

                    </div>
                    <div class="tabs__pane show">
                        <div class="personal__cal">
                            <div class="personal__cal-block">
                                <label class="label" for="">Дата заказа с</label>
                                <div class="input--dp">
                                    <input class="input" id="airpicker2" placeholder="дд.мм.гг" autocomplete="off"
                                           value="<?php echo $_GET['from']; ?>">
                                </div>
                            </div>
                            <div class="personal__cal-block">
                                <label class="label" for="">Дата заказа по</label>
                                <div class="input--dp">
                                    <input class="input" id="airpicker3" placeholder="дд.мм.гг" autocomplete="off"
                                           value="<?php echo $_GET['to']; ?>">
                                </div>
                            </div>
                        </div>
                        <div class="table table--personal">
                            <?php if ($arResult['ORDERS']) { ?>
                                <table class="table__wrapper orders-tab">
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Дата</th>
                                        <th>Товары</th>
                                        <th>Сумма</th>
                                        <th>Доставка</th>
                                        <th>Общая стоимость</th>
                                        <th>Статус</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php foreach ($arResult['ORDERS'] as $arOrder) { ?>
                                        <?php
                                        $orderDate = strtotime($arOrder['ORDER']['DATE_STATUS_FORMATED']);

                                        if ($from && $from > $orderDate) continue;
                                        if ($to && $to < $orderDate) continue;

                                        ?>
                                        <tr onclick="window.location = `<?php echo $arOrder['ORDER']['URL_TO_DETAIL']; ?>`">
                                            <td><?php echo $arOrder['ORDER']['ID']; ?></td>
                                            <td><?php echo $arOrder['ORDER']['DATE_STATUS_FORMATED']; ?></td>
                                            <td><?php echo count($arOrder['BASKET_ITEMS']); ?> шт</td>
                                            <td><?php echo number_format($arOrder['ORDER']['PRICE'], 0, '', ' '); ?> ₸
                                            </td>
                                            <td>
                                                <span><?php echo $arOrder['SHIPMENT'][0]['DELIVERY_NAME']; ?></span><span>0 ₸</span>
                                            </td>
                                            <td><?php echo number_format($arOrder['ORDER']['PRICE'], 0, '', ' '); ?> ₸
                                            </td>
                                            <td><?php echo $arResult['INFO']['STATUS'][$arOrder['ORDER']['STATUS_ID']]['NAME']; ?></td>
                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
                            <?php } else { ?>
                                У вас еще нет заказов.
                            <?php } ?>
                        </div>
                        <?php if (count($arResult['ORDERS']) > 8) { ?>
                            <div class="pagination">
                                <?= $arResult["NAV_STRING"]; ?>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

