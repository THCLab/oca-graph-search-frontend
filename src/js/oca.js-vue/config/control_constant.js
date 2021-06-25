// icon
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faCalculator} from '@fortawesome/free-solid-svg-icons/faCalculator';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faDatabase} from '@fortawesome/free-solid-svg-icons/faDatabase';

// GUI Control
import GUITextControl from '../../oca.js-vue/gui/ui/controls/TextControl';
import GUINumberControl from '../../oca.js-vue/gui/ui/controls/NumberControl';
import GUIDatePickerControl from '../../oca.js-vue/gui/ui/controls/DatePickerControl';
import GUITimePickerControl from '../../oca.js-vue/gui/ui/controls/TimePickerControl';
import GUISelectControl from '../../oca.js-vue/gui/ui/controls/SelectControl';
import GUICheckboxControl from '../../oca.js-vue/gui/ui/controls/CheckboxControl';
import GUIReferenceControl from '../../oca.js-vue/gui/ui/controls/ReferenceControl';

// TEMPLATE Control
/*
import TEMPLATETextControl from '../../oca.js-vue/template/ui/common/controls/TextControl';
import TEMPLATENumberControl from '../../oca.js-vue/template/ui/common/controls/NumberControl';
import TEMPLATECheckboxControl from '../../oca.js-vue/template/ui/common/controls/CheckboxControl';
import TEMPLATEDatePickerControl from '../../oca.js-vue/template/ui/common/controls/DatePickerControl';
import TEMPLATETimePickerControl from '../../oca.js-vue/template/ui/common/controls/TimePickerControl';
import TEMPLATESelectControl from '../../oca.js-vue/template/ui/common/controls/SelectControl';

// CONFIG CONTROL
import SIDEBARDatePickerControl from '../../oca.js-vue/template/ui/sidebar_items/DatePickerConfigComponent';
import SIDEBARTimePickerControl from '../../oca.js-vue/template/ui/sidebar_items/TimePickerConfigComponent';
import SIDEBARSelectControl from '../../oca.js-vue/template/ui/sidebar_items/SelectConfigComponent';
import SIDEBARNumberControl from '../../oca.js-vue/template/ui/sidebar_items/NumberConfigComponent';
import SIDEBARTextControl from '../../oca.js-vue/template/ui/sidebar_items/TextConfigComponent';
import SIDEBARCheckboxControl from '../../oca.js-vue/template/ui/sidebar_items/CheckboxConfigComponent';
*/

// Template Control
// special key for control:
// other_properties: {
//     x: "zzz",
//     c: "xxx",
//     ...
// },
// validation_func: function() {
//  // validation function here
// }
//
const CONTROL_TYPES = {
    text: {
        label:"Text Input",
        icon: faEdit,
        source: {
          gui: GUITextControl,
          // template: TEMPLATETextControl,
          // config: SIDEBARTextControl
        }
    },
    number: {
        label:"Number Input",
        icon: faCalculator,
        source: {
            gui: GUINumberControl,
            // template: TEMPLATENumberControl,
            // config: SIDEBARNumberControl
        }
    },
    datepicker: {
        label: "Date Picker",
        icon: faCalendarAlt,
        source: {
            gui: GUIDatePickerControl,
            // template: TEMPLATEDatePickerControl,
            // config: SIDEBARDatePickerControl,
        }
    },
    timepicker: {
        label:"Time Picker",
        icon: faClock,
        source: {
            gui: GUITimePickerControl,
            // template: TEMPLATETimePickerControl,
            // config: SIDEBARTimePickerControl,
        }
    },
    select: {
        label: "Select Option",
        icon: faDatabase,
        source: {
            gui: GUISelectControl,
            // template: TEMPLATESelectControl,
            // config: SIDEBARSelectControl
        }
    },
    checkbox: {
        label:"Checkbox",
        icon: faCheck,
        source: {
            gui: GUICheckboxControl,
            // template: TEMPLATECheckboxControl,
            // config: SIDEBARCheckboxControl
        }
    },
    reference: {
        label:"Reference",
        icon: faCheck,
        source: {
            gui: GUIReferenceControl
          //template: TEMPLATECheckboxControl,
          //config: SIDEBARCheckboxControl
        }
    }
};

export {
    CONTROL_TYPES
}
