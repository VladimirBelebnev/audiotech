<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<section class="about">
    <div class="_container">
        <h1 class="title-page">О нас</h1>
    </div>
    <div class="_container _container--mode">
        <div class="tabs">
            <div class="tabs__nav">
                <a href="/about/" class="tabs__btn">Компания</a>
                <a href="/about/specialists/" class="tabs__btn">Специалисты</a>
                <a href="/about/news/" class="tabs__btn">Новости</a>
                <a href="/about/license/" class="tabs__btn active">Лицензии</a>
            </div>
            <div class="tabs__content">
                <div class="tabs__pane show">
                    <div class="tabs__pane-wrap">
                        <div class="licenses">
                            <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
                                <div class="licenses__item"><a class="licenses__link" href="<?php echo $arItem['PREVIEW_PICTURE']['SRC']; ?>"><img src="<?php echo $arItem['PREVIEW_PICTURE']['SRC']; ?>" alt="<?php echo $arItem['NAME']; ?>"></a></div>
                            <?php } ?>
                        </div>
                        <div class="license-overlay">
                            <div class="license-overlay__wrap">
                                <button class="close-white close-white--l" id="close-license"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#131313"/></svg></button><img id="license-full" src="/" alt="Большая фотография">
                            </div>
                        </div>
                        <div class="pagination">
                            <? if ($arParams["DISPLAY_BOTTOM_PAGER"]): ?>
                                <?= $arResult["NAV_STRING"]; ?>
                            <? endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
