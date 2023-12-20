<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
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
<div class="big-banner" style="background-image: url(<?php echo $arResult['DETAIL_PICTURE']['SRC']; ?>); background-size: cover; background-repeat: no-repeat; background-position: top;">
    <div class="big-banner__wrap">
        <div class="_container">
            <div class="big-banner__col">
                <?php $APPLICATION->IncludeComponent(
                    'bitrix:breadcrumb',
                    'services',
                    []
                ); ?>
                <h1 class="title-page big-banner__title"><?php echo $arResult['NAME']; ?></h1>
                <p class="big-banner__subtitle"><?php echo $arResult['DETAIL_TEXT']; ?></p><a class="btn btn--icn btn--red btn--l" href="#" data-target="modal-reg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H7V3C7 2.44772 7.44772 2 8 2ZM7 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V6H9V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6Z" fill="white"/>
                        <path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="white"/>
                        <path d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z" fill="white"/>
                        <path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill="white"/>
                        <path d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z" fill="white"/>
                        <path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z" fill="white"/>
                    </svg>Записаться на приём</a>
            </div>
            <div class="big-banner__col">
                <ul class="big-banner__list">
                    <li>Вы узнаете</li>
                    <?php foreach ($arResult['DISPLAY_PROPERTIES']['WILL_LEARN']['VALUE'] as $sItem) { ?>
                        <li><?php echo $sItem; ?></li>
                    <?php } ?>
                </ul><a class="btn btn--icn btn--red btn--l" href="#" data-target="modal-reg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H7V3C7 2.44772 7.44772 2 8 2ZM7 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V6H9V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6Z" fill="white"/>
                        <path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="white"/>
                        <path d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z" fill="white"/>
                        <path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill="white"/>
                        <path d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z" fill="white"/>
                        <path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z" fill="white"/>
                    </svg>Записаться на приём</a>
            </div>
        </div>
    </div>
</div>
<div class="advantages">
    <div class="_container">
        <ul class="advantages__list">
            <li class="advantages__item">
                <div class="advantages__pic">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 9.99997M20.618 5.98397C17.4561 6.15189 14.3567 5.05858 12 2.94397C9.64327 5.05858 6.5439 6.15189 3.382 5.98397C3.12754 6.96908 2.99918 7.98252 3 8.99997C3 14.591 6.824 19.29 12 20.622C17.176 19.29 21 14.592 21 8.99997C21 7.95797 20.867 6.94797 20.618 5.98397Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><?php $APPLICATION->IncludeFile("/include/service-item-1.php", [], ["MODE" => "html"]); ?>
            </li>
            <li class="advantages__item">
                <div class="advantages__pic">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8.5V12.5L15 15.5M21 12.5C21 13.6819 20.7672 14.8522 20.3149 15.9442C19.8626 17.0361 19.1997 18.0282 18.364 18.864C17.5282 19.6997 16.5361 20.3626 15.4442 20.8149C14.3522 21.2672 13.1819 21.5 12 21.5C10.8181 21.5 9.64778 21.2672 8.55585 20.8149C7.46392 20.3626 6.47177 19.6997 5.63604 18.864C4.80031 18.0282 4.13738 17.0361 3.68508 15.9442C3.23279 14.8522 3 13.6819 3 12.5C3 10.1131 3.94821 7.82387 5.63604 6.13604C7.32387 4.44821 9.61305 3.5 12 3.5C14.3869 3.5 16.6761 4.44821 18.364 6.13604C20.0518 7.82387 21 10.1131 21 12.5Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><?php $APPLICATION->IncludeFile("/include/service-item-2.php", [], ["MODE" => "html"]); ?>
            </li>
            <li class="advantages__item">
                <div class="advantages__pic">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5H21H3ZM7 15.5H8H7ZM12 15.5H13H12ZM6 19.5H18C18.7956 19.5 19.5587 19.1839 20.1213 18.6213C20.6839 18.0587 21 17.2956 21 16.5V8.5C21 7.70435 20.6839 6.94129 20.1213 6.37868C19.5587 5.81607 18.7956 5.5 18 5.5H6C5.20435 5.5 4.44129 5.81607 3.87868 6.37868C3.31607 6.94129 3 7.70435 3 8.5V16.5C3 17.2956 3.31607 18.0587 3.87868 18.6213C4.44129 19.1839 5.20435 19.5 6 19.5Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><?php $APPLICATION->IncludeFile("/include/service-item-3.php", [], ["MODE" => "html"]); ?>
            </li>
            <li class="advantages__item">
                <div class="advantages__pic">
                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.325 4.51407C10.751 2.8813 13.249 2.8813 13.675 4.51407C13.7389 4.75936 13.8642 4.98714 14.0407 5.17889C14.2172 5.37064 14.4399 5.52093 14.6907 5.61753C14.9414 5.71414 15.2132 5.75432 15.4838 5.73481C15.7544 5.7153 16.0162 5.63665 16.248 5.50526C17.791 4.63123 19.558 6.2733 18.618 7.70895C18.4769 7.92435 18.3924 8.16766 18.3715 8.41912C18.3506 8.67058 18.3938 8.92308 18.4975 9.15611C18.6013 9.38913 18.7627 9.5961 18.9687 9.76019C19.1747 9.92428 19.4194 10.0409 19.683 10.1005C21.439 10.4966 21.439 12.8193 19.683 13.2154C19.4192 13.2748 19.1742 13.3913 18.968 13.5554C18.7618 13.7195 18.6001 13.9266 18.4963 14.1597C18.3924 14.3929 18.3491 14.6456 18.3701 14.8972C18.3911 15.1488 18.4757 15.3923 18.617 15.6078C19.557 17.0425 17.791 18.6855 16.247 17.8115C16.0153 17.6803 15.7537 17.6018 15.4832 17.5823C15.2128 17.5628 14.9412 17.603 14.6906 17.6995C14.44 17.796 14.2174 17.9461 14.0409 18.1376C13.8645 18.3291 13.7391 18.5567 13.675 18.8018C13.249 20.4345 10.751 20.4345 10.325 18.8018C10.2611 18.5565 10.1358 18.3287 9.95929 18.1369C9.7828 17.9452 9.56011 17.7949 9.30935 17.6983C9.05859 17.6017 8.78683 17.5615 8.51621 17.581C8.24559 17.6005 7.98375 17.6792 7.752 17.8106C6.209 18.6846 4.442 17.0425 5.382 15.6069C5.5231 15.3915 5.60755 15.1482 5.62848 14.8967C5.64942 14.6452 5.60624 14.3927 5.50247 14.1597C5.3987 13.9267 5.23726 13.7197 5.03127 13.5556C4.82529 13.3915 4.58056 13.275 4.317 13.2154C2.561 12.8193 2.561 10.4966 4.317 10.1005C4.5808 10.041 4.82578 9.92451 5.032 9.76041C5.23822 9.5963 5.39985 9.38924 5.50375 9.15608C5.60764 8.92291 5.65085 8.67023 5.62987 8.4186C5.60889 8.16697 5.5243 7.92351 5.383 7.70802C4.443 6.2733 6.209 4.6303 7.753 5.50433C8.749 6.06967 10.049 5.56942 10.325 4.51407Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 11.6579C15 12.3977 14.6839 13.1072 14.1213 13.6303C13.5587 14.1535 12.7956 14.4474 12 14.4474C11.2044 14.4474 10.4413 14.1535 9.87868 13.6303C9.31607 13.1072 9 12.3977 9 11.6579C9 10.9181 9.31607 10.2086 9.87868 9.68543C10.4413 9.1623 11.2044 8.86841 12 8.86841C12.7956 8.86841 13.5587 9.1623 14.1213 9.68543C14.6839 10.2086 15 10.9181 15 11.6579V11.6579Z" stroke="#131313" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><?php $APPLICATION->IncludeFile("/include/service-item-4.php", [], ["MODE" => "html"]); ?>
            </li>
        </ul>
    </div>
</div>
<?php if ($arResult['SPECIALISTS']) { ?>
    <section class="slider-block">
        <div class="_container">
            <h2 class="section-title break-w"><span>Высококвалицифированные специалисты</span>
                <a href="/about/specialists/" class="btn btn--grey btn--m">Все специалисты</a>
            </h2>
            <div class="slider-block__wrap swiper actual-slider pr30 pb0">
                <div class="swiper-wrapper">
                    <?php foreach ($arResult['SPECIALISTS'] as $arItem) { ?>
                        <div class="swiper-slide">
                            <div class="doctors__item"><img class="doctors__pic" src="<?php echo CFile::getPath($arItem['PREVIEW_PICTURE']); ?>" alt=""><span class="doctors__profile"><?php echo $arItem['SPECIALIZATION_VALUE']; ?></span><span class="doctors__name"><?php echo $arItem['NAME']; ?></span><span class="doctors__education"><?php echo $arItem['PREVIEW_TEXT']; ?></span>
                                <button class="btn btn--red btn--m doctors__item-btn" data-target="modal-reg">Записаться на приём</button>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>
<?php } ?>
<?php if ($arResult['PRICES']) { ?>
    <section class="price-service">
        <div class="_container">
            <h2 class="section-title"><span>Стоимость услуг</span>
                <a href="/customer/services/" class="btn btn--grey btn--m">Все услуги</a>
            </h2>
            <table class="price-service__table">
                <?php foreach ($arResult['PRICES'] as $arItem) { ?>
                    <tr>
                        <td><?php echo $arItem['NAME']; ?></td>
                        <td><?php echo $arItem['PREVIEW_TEXT']; ?></td>
                    </tr>
                <?php } ?>
            </table>
        </div>
    </section>
<?php } ?>
<section class="human-block">
    <div class="_container">
        <div class="human-block__container human-block--doc2">
            <div class="human-block__wrap">
                <h2 class="section-title human-block__title human-block__title--mode">Записаться <br> на приём </h2>
                <div class="human-block__descr"><?php $APPLICATION->IncludeFile("/include/service-human.php", [], ["MODE" => "html"]); ?></div><a class="btn btn--red btn--icn btn--l" href="" data-target="modal-reg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H7V3C7 2.44772 7.44772 2 8 2ZM7 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V6H9V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6Z" fill="white"/><path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="white"/><path d="M9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15C7 14.4477 7.44772 14 8 14C8.55228 14 9 14.4477 9 15Z" fill="white"/><path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill="white"/><path d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z" fill="white"/><path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z" fill="white"/></svg>Записаться на приём</a>
            </div>
        </div>
    </div>
</section>