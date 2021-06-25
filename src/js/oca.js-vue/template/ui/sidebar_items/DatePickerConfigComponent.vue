<template>
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="form-group">
                <label>Date Format</label>
                <select2-control :options="dateFormatOptions" v-model="dateFormat"></select2-control>
            </div>
        </div>
    </div>
</template>

<script>
    import Select2Control from "../../../../oca.js-vue/third_party_controls/Select2Control";
    import {CONTROL_CONSTANTS} from "../../../../oca.js-vue/config/constants";
    import DateFormater from "../../../../oca.js-vue/date_formater";

    export default {
        name: "DatePickerConfigComponent",
        components: {Select2Control},
        props: {
            control: {
                type: Object
            },
        },
        data: () => ({
            dateFormatOptions: [],
            dateFormat: null
        }),
        watch: {
          dateFormat: function() {
            this.control.dateFormat = DateFormater.toJQuery(this.dateFormat)
          }
        },
        created() {
            this.dateFormatOptions = _.map(CONTROL_CONSTANTS.DateFormat, (value, key) => {
                return DateFormater.toStandard(key);
            });
        },
    }
</script>

<style scoped>

</style>
