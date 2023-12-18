<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$this->setFrameMode(true);

/**
 * @global $arResult
 */
?>
<div class="chips">
    <div class="chips__inner">
        <?php foreach ($arResult['ITEMS'] as $arItem) { ?>
            <a href="/about/news/<?php echo $arItem['CODE'] ? $arItem['CODE'] . '/' : ''; ?>" class="chips__item <?php echo $arItem['LINK_ACTIVE'] == 'Y' ? 'active' : ''; ?>"><?php echo $arItem['NAME']; ?></a>
        <?php } ?>
    </div>
</div>