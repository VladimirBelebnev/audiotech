<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Отзывы");
?>

    <section class="map">
        <div class="_container">
            <h2 class="title-page map__title"><?php $APPLICATION->ShowTitle(false); ?></h2>
        </div>
        <div class="_container">
            <div class="container">
                <div class="feedbacks">
                    <iframe style="width:100%;height:100%;border:1px solid #e6e6e6;border-radius:8px;box-sizing:border-box"
                            src="https://yandex.ru/maps-reviews-widget/226327670406?comments"></iframe>
                    <a href="https://yandex.ru/maps/org/usadba_izmaylovo/226327670406/" target="_blank"
                       style="box-sizing:border-box;text-decoration:none;color:#b3b3b3;font-size:10px;font-family:YS Text,sans-serif;padding:0 20px;position:absolute;bottom:8px;width:100%;text-align:center;left:0">Усадьба
                        Измайлово на карте Москвы — Яндекс.Карты</a>
                </div>
            </div>
        </div>
    </section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>