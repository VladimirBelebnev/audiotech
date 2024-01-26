<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('Центры слуха');
$APPLICATION->AddChainItem('Центры слуха', '/centers/');
?>
<section class="map">
    <div class="_container">
        <h1 class="section-title map__title">Центры слуха
            <div class="map__change">
                <select class="mySelect">
                    <option value="">Алма-Ата </option>
                    <option value="">Алма-Ата</option>
                    <option value="">Алма-Ата</option>
                </select>
            </div>
        </h1>
        <div class="map-content" id="map"></div>
    </div>
</section>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
