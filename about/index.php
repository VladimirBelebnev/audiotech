<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle('О нас');
$APPLICATION->AddChainItem('О нас', '/about/');
?>
    <section class="about">
        <div class="_container">
            <h1 class="title-page">О нас</h1>
        </div>
        <div class="_container _container--mode">
            <div class="tabs">
                <div class="tabs__nav">
                    <a href="/about/" class="tabs__btn active">Компания</a>
                    <a class="tabs__btn">Специалисты</a>
                    <a href="/about/news/" class="tabs__btn">Новости</a>
                    <a class="tabs__btn">Лицензии</a>
                </div>
                <div class="tabs__content">
                    <div class="tabs__pane show">
                        <div class="tabs__pane-wrap">
                            <h2 class="section-title">Центры слуха Audiotech</h2>
                            <p class="tabs__par tabs__par--container strong"><?php $APPLICATION->IncludeFile("/include/about-text-1.php", [], ["MODE" => "html"]); ?></p>
                            <div class="about__text"><?php $APPLICATION->IncludeFile("/include/about-text-2.php", [], ["MODE" => "html"]); ?></div>
                            <div class="about-cifrus">
                                <h2 class="section-title section-title--w">Мы в цифрах</h2>
                                <div class="about-cifrus__wrap">
                                    <ul class="about-cifrus__list">
                                        <?php $APPLICATION->IncludeFile("/include/about.php", [], ["MODE" => "html"]); ?>
                                    </ul>
                                    <?php $APPLICATION->IncludeFile("/include/about-video.php", [], ["MODE" => "html"]); ?>
                                </div>
                            </div>

                            <?php $APPLICATION->IncludeComponent(
                                'coderoom:about.map',
                                '.default',
                                []
                            ); ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php $APPLICATION->IncludeComponent(
        'coderoom:main.offers',
        '.default',
        []
    ); ?>
<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
