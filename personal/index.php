<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Страница пользователя');
?>
<?php // Параметры пользователя - http://dev.1c-bitrix.ru/user_help/settings/users/components_2/main_profile.php
$APPLICATION->IncludeComponent(
	"bitrix:main.profile",
	".default",                   // [eshop_adapt, .default]
	array(        
		// region Управление режимом AJAX         
		"AJAX_MODE"               =>  "N",          // Включить режим AJAX          
		"AJAX_OPTION_JUMP"        =>  "N",          // Включить прокрутку к началу компонента          
		"AJAX_OPTION_STYLE"       =>  "Y",          // Включить подгрузку стилей          
		"AJAX_OPTION_HISTORY"     =>  "N",          // Включить эмуляцию навигации браузера          
		"AJAX_OPTION_ADDITIONAL"  =>  "",           // Дополнительный идентификатор          
		// endregion         
		// region Дополнительные настройки         
		"SET_TITLE"               =>  "Y",          // Устанавливать заголовок страницы          
		"USER_PROPERTY"           =>  array( ),  // Показывать доп. свойства          
		"SEND_INFO"               =>  "N",          // Генерировать почтовое событие          
		"CHECK_RIGHTS"            =>  "N",          // Проверять права доступа          
		// endregion 
	)
); ?>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
