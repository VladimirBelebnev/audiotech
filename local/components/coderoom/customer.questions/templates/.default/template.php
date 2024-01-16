<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 */
?>

<div class="chips">
    <div class="_container">
        <div class="chips__inner">
            <?php foreach ($arResult['ITEMS']['SECTIONS'] as $arSection) { ?>
                <button data-section="<?php echo $arSection['ID']; ?>" class="chips__item"><?php echo $arSection['NAME']; ?></button>
            <?php } ?>
        </div>
    </div>
</div>
<div class="_container">
    <div class="__container-2cols">
        <?php foreach ($arResult['ITEMS']['SECTIONS'] as $arSection) { ?>
            <div data-section="<?php echo $arSection['ID']; ?>" class="accordion">
                <?php $i = 1; ?>
                <?php foreach ($arResult['ITEMS']['ELEMENTS'] as $arItem) { ?>
                    <?php if ($arItem['IBLOCK_SECTION_ID'] == $arSection['ID']) { ?>
                        <div class="accordion__item">
                            <div class="accordion__header"> <span>0<?php echo $i; ?></span><span><?php echo $arItem['NAME']; ?></span></div>
                            <div class="accordion__body">
                                <div class="accordion__content">
                                    <p><?php echo $arItem['PREVIEW_TEXT']; ?></p>
                                </div>
                            </div>
                        </div>
                        <?php $i++; ?>
                    <?php } ?>
                <?php } ?>
            </div>
        <?php } ?>

        <div class="aside-block aside-block--questions">
            <h2 class="aside-block__title">Задать вопрос</h2>
            <form class="aside-block__forms aside-block__forms--mode questions-form">
                <input type="hidden" name="formName" value="Задать вопрос">
                <input name="name" class="input-default" type="text" placeholder="Ваше имя">
                <input name="phone" class="input-default" type="tel" placeholder="Телефон">
                <input name="email" class="input-default" type="email" placeholder="Электронная почта">
                <textarea class="input-default" name="message" placeholder="Вопрос"></textarea>
                <p class="aside-block__agree">Подписываясь, вы даете согласие на <a href="">обработку персональных
                        данных</a></p>
                <button class="btn btn--red btn--l btn--icn" type="submit">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 8L11.39 13.26C11.7187 13.4793 12.1049 13.5963 12.5 13.5963C12.8951 13.5963 13.2813 13.4793 13.61 13.26L21.5 8M5.5 19H19.5C20.0304 19 20.5391 18.7893 20.9142 18.4142C21.2893 18.0391 21.5 17.5304 21.5 17V7C21.5 6.46957 21.2893 5.96086 20.9142 5.58579C20.5391 5.21071 20.0304 5 19.5 5H5.5C4.96957 5 4.46086 5.21071 4.08579 5.58579C3.71071 5.96086 3.5 6.46957 3.5 7V17C3.5 17.5304 3.71071 18.0391 4.08579 18.4142C4.46086 18.7893 4.96957 19 5.5 19Z"
                              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Отправить</span></button>
            </form>
        </div>
    </div>
</div>