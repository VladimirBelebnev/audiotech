<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

$arMenu = [];
$lastIndex = 0;

foreach ($arResult as $iFirstLevelKey => $arFirstLevelLink)
{
    if ($arFirstLevelLink['DEPTH_LEVEL'] == 1)
    {
        $arMenu[$arFirstLevelLink['ITEM_INDEX']] = $arFirstLevelLink;

        foreach ($arResult as $iSecondLevelKey => $arSecondLevelLink)
        {
            if ($iSecondLevelKey <= $iFirstLevelKey) continue;
            if ($arSecondLevelLink['DEPTH_LEVEL'] == 3) continue;
            if ($arSecondLevelLink['DEPTH_LEVEL'] == 1) break;

            $arMenu[$iFirstLevelKey]['CHILD'][$iSecondLevelKey] = $arSecondLevelLink;

            foreach ($arResult as $iThirdLevelKey => $arThirdLevelLink)
            {
                if ($iThirdLevelKey <= $iSecondLevelKey) continue;
                if ($arThirdLevelLink['DEPTH_LEVEL'] == 2) break;
                if ($arThirdLevelLink['DEPTH_LEVEL'] == 1) break;

                $arMenu[$iFirstLevelKey]['CHILD'][$iSecondLevelKey]['CHILD'][$iThirdLevelKey] = $arThirdLevelLink;
            }
        }
    }
}
?>

<ul class="main-nav__list">
    <?php foreach ($arMenu as $iFirstLevelKey => $arFirstLevel) { ?>
        <li class="main-nav__item <?php echo $arFirstLevel['SELECTED'] ? 'active' : ''; ?>">
            <a class="main-nav__link <?php echo $arFirstLevel['CHILD'] ? 'main-nav__link--arrow' : ''; ?>" href="<?php echo $arFirstLevel['ADDITIONAL_LINKS'][0]; ?>">
                <?php echo $arFirstLevel['TEXT']; ?>
            </a>
            <?php if ($arFirstLevel['CHILD']) { ?>
                <?php if ($iFirstLevelKey == 0) { ?>
                    <div class="main-nav__submenu-wrap main-nav__submenu-wrap--full-screen">
                        <div class="main-nav__submenu">
                            <div class="_container">
                                <div class="main-submenu__box">
                                    <?php foreach ($arFirstLevel['CHILD'] as $arSecondLevel) { ?>
                                        <?php if ($arSecondLevel['CHILD']) { ?>
                                            <ul class="main-submenu__list">
                                                <?php if (count($arSecondLevel['CHILD']) > 1) { ?>
                                                    <div class="main-submenu__title"><?php echo $arSecondLevel['TEXT']; ?></div>
                                                    <?php if($arSecondLevel['CHILD']) { ?>
                                                        <ul class="main-nav__submenu">
                                                            <?php foreach ($arSecondLevel['CHILD'] as $arThirdLevel) { ?>
                                                                <li class="main-submenu__item"><a class="main-submenu__link" href="<?php echo $arThirdLevel['ADDITIONAL_LINKS'][0]; ?>"><?php echo $arThirdLevel['TEXT']; ?></a></li>
                                                            <?php } ?>
                                                        </ul>
                                                    <?php } ?>
                                                <?php } ?>
                                            </ul>
                                        <?php } ?>
                                    <?php } ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php } else { ?>
                    <div class="main-nav__submenu-wrap">
                        <div class="main-nav__submenu">
                            <ul class="main-nav__submenu-box">
                                <?php foreach ($arFirstLevel['CHILD'] as $arSecondLevel) { ?>
                                    <li class="main-nav__item"><a class="main-nav__link" href="<?php echo $arSecondLevel['ADDITIONAL_LINKS'][0]; ?>"><?php echo $arSecondLevel['TEXT']; ?></a></li>
                                <?php } ?>
                            </ul>
                        </div>
                    </div>
                <?php } ?>
                <span class="link__arrow"></span>
            <?php } ?>
        </li>
    <?php } ?>
</ul>