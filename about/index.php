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
                    <a class="tabs__btn">Новости</a>
                    <a class="tabs__btn">Лицензии</a>
                </div>
                <div class="tabs__content">
                    <div class="tabs__pane show">
                        <div class="tabs__pane-wrap">
                            <h2 class="section-title">Центры слуха Audiotech</h2>
                            <p class="tabs__par tabs__par--container strong">Morbi et fermentum lorem.  Praesent iaculis sem eu mauris ultricies dictum. Pellentesque finibus, ante sed tincidunt feugiat, dui sem malesuada sem, nec elementum libero lectus sagittis nunc. Morbi et fermentum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p>
                            <div class="about__text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet volutpat sapien. Sed eu ipsum a diam placerat vulputate. Maecenas laoreet ultrices nisi id sagittis. Sed metus leo, tempor non semper eu, posuere vitae quam. Sed vitae sem lorem. Aliquam vestibulum elementum purus et iaculis. Nunc at maximus magna. </p>
                                <p>Praesent iaculis sem eu mauris ultricies dictum. Pellentesque finibus, ante sed tincidunt feugiat, dui sem malesuada sem, nec elementum libero lectus sagittis nunc. Morbi et fermentum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque tempor feugiat velit nec elementum.</p>
                            </div>
                            <div class="about-cifrus">
                                <h2 class="section-title section-title--w">Мы в цифрах</h2>
                                <div class="about-cifrus__wrap">
                                    <ul class="about-cifrus__list">
                                        <li class="about-cifrus__item"><span class="about-cifrus__number">3</span><span class="about-cifrus__label">центра слуха </span></li>
                                        <li class="about-cifrus__item"><span class="about-cifrus__number">12</span><span class="about-cifrus__label">тысяч покупателей ежегодно</span></li>
                                        <li class="about-cifrus__item"><span class="about-cifrus__number">200</span><span class="about-cifrus__label">моделей в ассортименте</span></li>
                                        <li class="about-cifrus__item"><span class="about-cifrus__number">15</span><span class="about-cifrus__label">лет на рынке</span></li>
                                    </ul>
                                    <div class="about-cifrus__video">
                                        <div class="play-video"><img src="<?php echo SITE_TEMPLATE_PATH ?>/images/video-back.jpg" alt="Видео">
                                            <button class="btn-play"></button>
                                        </div>
                                    </div>
                                    <div class="video-wrap">
                                        <iframe id="video" width="1024" height="768" src="https://www.youtube.com/embed/LvQossUx7ss?si=pH9KasmmTG0Q50Ew&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                        <button class="video-wrap__close stop-video"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="map">
                                <h2 class="section-title map__title"> <span>Представительства компании</span>
                                    <div class="select-place">
                                        <select class="mySelect">
                                            <option value="Алма-Ата">Алма-Ата</option>
                                            <option value="Алма-Ата">Алма-Ата</option>
                                            <option value="Алма-Ата">Алма-Ата</option>
                                        </select>
                                    </div>
                                </h2>
                                <div class="map-content map-content--about" id="map-about"></div>
                            </div>
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
