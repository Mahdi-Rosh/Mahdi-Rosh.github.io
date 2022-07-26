const options = {
    initialValue: false,
    viewMode: "year",
    format: "lll",
    minDate: new persianDate().add("day", 3),
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

const date = $(".date").pDatepicker(options);