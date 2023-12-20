<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 */
?>
<ul class="materials__list">
    <li>
        <label class="label" for="">Выберите бренд</label>
        <select class="mySelect" name="">
            <?php foreach ($arResult['ITEMS']['FIRST_LEVEL'] as $arItem) { ?>
                <option value=""><?php echo $arItem['NAME']; ?></option>
            <?php } ?>
        </select>
    </li>

    <li>
        <label class="label" for="">Выберите модель</label>
        <select class="mySelect" name="">
            <option value="">Все</option>
            <option value="">Все</option>
        </select>
    </li>
</ul>