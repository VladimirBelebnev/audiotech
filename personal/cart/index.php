<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Корзина');
?>
    <?php // Корзина
    $APPLICATION->IncludeComponent(
    	"bitrix:sale.basket.basket",
    	".default",
    	array(        
    		// region Внешний вид         
    		"COLUMNS_LIST"                   =>  array( 0 => 'NAME', 1 => 'PRICE', 2 => 'TYPE', 3 => 'DISCOUNT', 4 => 'QUANTITY', 5 => 'DELETE', 6 => 'DELAY', 7 => 'WEIGHT', ),  // Выводимые колонки : array ( 'NAME' => 'Название товара', 'DISCOUNT' => 'Скидка', 'WEIGHT' => 'Вес', 'PROPS' => 'Свойства товара', 'DELETE' => 'Удалить', 'DELAY' => 'Отложить', 'TYPE' => 'Тип цены', 'PRICE' => 'Цена', 'QUANTITY' => 'Количество', 'SUM' => 'Сумма', 'PROPERTY_TITLE' => 'Заголовок окна браузера', 'PROPERTY_KEYWORDS' => 'Ключевые слова', 'PROPERTY_META_DESCRIPTION' => 'Мета-описание', 'PROPERTY_BRAND_REF' => 'Бренд', 'PROPERTY_NEWPRODUCT' => 'Новинка', 'PROPERTY_SALELEADER' => 'Лидер продаж', 'PROPERTY_SPECIALOFFER' => 'Спецпредложение', 'PROPERTY_ARTNUMBER' => 'Артикул ('Одежда', 'Одежда (предложения)')', 'PROPERTY_MANUFACTURER' => 'Производитель', 'PROPERTY_MATERIAL' => 'Материал', 'PROPERTY_COLOR' => 'Цвет [COLOR] ', 'PROPERTY_MORE_PHOTO' => 'Картинки ('Одежда', 'Одежда (предложения)')', 'PROPERTY_FORUM_MESSAGE_CNT' => 'Количество комментариев к элементу', 'PROPERTY_RECOMMEND' => 'С этим товаром рекомендуем', 'PROPERTY_FORUM_TOPIC_ID' => 'Тема форума для комментариев', 'PROPERTY_MINIMUM_PRICE' => 'Минимальная цена', 'PROPERTY_MAXIMUM_PRICE' => 'Максимальная цена', 'PROPERTY_CML2_LINK' => 'Элемент каталога', 'PROPERTY_COLOR_REF' => 'Цвет [COLOR_REF] ', 'PROPERTY_SIZES_SHOES' => 'Размеры обуви', 'PROPERTY_SIZES_CLOTHES' => 'Размеры одежды ', )         
    		// endregion         
    		// region Дополнительные настройки         
    		"PATH_TO_ORDER"                  =>  "/personal/order.php",                                                                                                                                      // Страница оформления заказа          
    		"HIDE_COUPON"                    =>  "N",                                                                                                                                                        // Спрятать поле ввода купона : array ( 'N' => 'Нет', 'Y' => 'Да', )         
    		"PRICE_VAT_SHOW_VALUE"           =>  "N",                                                                                                                                                        // Отображать значение НДС          
    		"COUNT_DISCOUNT_4_ALL_QUANTITY"  =>  "N",                                                                                                                                                        // Рассчитывать скидку для каждой позиции (на все количество товара)          
    		"USE_PREPAYMENT"                 =>  "N",                                                                                                                                                        // Использовать предавторизацию для оформления заказа (PayPal Express Checkout)          
    		"QUANTITY_FLOAT"                 =>  "N",                                                                                                                                                        // Использовать дробное значение количества          
    		"SET_TITLE"                      =>  "Y",                                                                                                                                                        // Устанавливать заголовок страницы          
    		"ACTION_VARIABLE"                =>  "action",                                                                                                                                                   // Название переменной действия          
    		// endregion 
    	)
    ); ?>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
