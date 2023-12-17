<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 */
?>

<section class="offers">
    <div class="_container">
        <div class="offers__wrap">
            <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
            <div class="offers__item"><img src="<?php echo CFile::GetPath($arItem['PREVIEW_PICTURE']); ?>" alt="<?php echo $arItem['NAME']; ?>">
                <div class="offers__name"><?php echo $arItem['NAME']; ?></div>
                <p class="offers__text"><?php echo $arItem['PREVIEW_TEXT']; ?></p>
                <!-- Если ссылка на каталог -->
                <?php if ($arItem['BTN_ACTION_VALUE'] == 2) { ?>
                    <a class="btn btn--red btn--m" href="/catalog/"><?php echo $arItem['BTN_TEXT_VALUE']; ?></a>
                <?php } else { ?>
                    <!-- Выбор модального окна (3 – запись, 4 – звонок) -->
                    <button class="btn btn--red btn--m" <?php echo $arItem['BTN_ACTION_VALUE'] == 3 ? 'data-target="modal-reg"' : 'data-target="modal-call"';  ?>><?php echo $arItem['BTN_TEXT_VALUE']; ?></button>
                <?php } ?>
            </div>
            <?php } ?>
        </div>
    </div>
</section>