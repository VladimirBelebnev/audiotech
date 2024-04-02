<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

global $APPLICATION;

/**
 * @global $arResult
 */
?>

<?php if ($APPLICATION->GetCurPage(false) != '/catalog/aksessuary/') { ?>
    <section class="offers">
        <div class="_container">
            <div class="offers__wrap">
                <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
                    <div class="offers__item"><img src="<?php echo CFile::GetPath($arItem['IMAGE_VALUE']); ?>" alt="<?php echo $arItem['NAME']; ?>">
                        <div class="offers__name"><?php echo $arItem['NAME']; ?></div>
                        <p class="offers__text"><?php echo $arItem['PREVIEW_TEXT']; ?></p>
                        <!-- Если ссылка на каталог -->
                        <?php if ($arItem['BTN_ACTION_VALUE'] == 2) { ?>
                            <a class="btn btn--red btn--m" href="/catalog/aksessuary/"><?php echo $arItem['BTN_TEXT_VALUE']; ?></a>
                        <?php } else if ($arItem['BTN_ACTION_VALUE'] == 27) { ?>
                            <a class="btn btn--red btn--m" href="/customer/services/"><?php echo $arItem['BTN_TEXT_VALUE']; ?></a>
                        <?php } else if ($arItem['BTN_ACTION_VALUE'] == 28) { ?>
                            <a class="btn btn--red btn--m" href="https://api.whatsapp.com/send?phone="><?php echo $arItem['BTN_TEXT_VALUE']; ?></a>
                        <?php } else { ?>
                            <!-- Выбор модального окна (3 – запись, 4 – звонок) -->
                            <button class="btn btn--red btn--m" data-target="modal-reg"><?php echo $arItem['BTN_TEXT_VALUE']; ?></button>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </section>
<?php } ?>