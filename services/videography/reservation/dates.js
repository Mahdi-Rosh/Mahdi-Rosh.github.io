const firstDateOptions = {
    initialValue: false,
    viewMode: "year",
    minDate: new persianDate().add("day", 5),
    maxDate: new persianDate().add("year", 1),
    timePicker: {
        enabled: true,

        minute: {
            step: 15,
        },

        second: {
            enabled: false,
        },
    },
};

const secondDateOptions = {
    initialValue: false,
    viewMode: "year",
    minDate: new persianDate().add("day", 20),
    maxDate: new persianDate().add("day", 385),
    timePicker: {
        enabled: true,

        minute: {
            step: 15,
        },

        second: {
            enabled: false,
        },
    },
}

$(".first-date").pDatepicker(firstDateOptions);
$(".second-date").pDatepicker(secondDateOptions);