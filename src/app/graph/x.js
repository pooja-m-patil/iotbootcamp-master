function open() {

    $("#singleSelectCombo").igCombo({
        width: 300,
        dataSource: colors,
        textKey: "Name",
        valueKey: "Name",
        dropDownOnFocus: true,
        dropDownOrientation: "bottom"
    });

    $("#multiSelectCombo").igCombo({
        width: 300,
        dataSource: colors,
        textKey: "Name",
        valueKey: "Name",
        multiSelection: {
            enabled: true
        },
        dropDownOrientation: "bottom"
    });

    $("#checkboxSelectCombo").igCombo({
        width: 300,
        dataSource: colors,
        textKey: "Name",
        valueKey: "Name",
        multiSelection: {
            enabled: true,
            showCheckboxes: true
        },
        dropDownOrientation: "bottom"
    });

};
