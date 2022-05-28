odoo.define('odoo_js_tutorial.my_field_widget', function (require) {
"use strict";


var AbstractField = require('web.AbstractField');
var fieldRegistry = require('web.field_registry');

var colorField = AbstractField.extend({
        className: 'o_int_colorpicker',  /*Css for the widget*/
        tagName: 'span',
        supportedFieldTypes: ['integer'],
             events: {
                'click .o_color_pill': 'clickPill',   /*assigning Handeler to class like click on item of this calls to run clickpill */
             },

        init: function () {
        this.totalColors = 10;  /*Initializing color and usper */
        this._super.apply(this, arguments);
     },


         _renderEdit: function () {
             this.$el.empty(); /*We need to remove the options and selected and recreate with the latest selected value*/
             /*Looping through the colours and assigning clases to each color also if color is already selected then making it active */
             for (var i = 0; i < this.totalColors; i++ ) {
             var className = "o_color_pill o_color_" + i;
             if (this.value === i ) {
             className += ' active';
            }
         this.$el.append($('<span>', {
                 'class': className,
                 'data-val': i,
                 }));
         }
        },
        /*In readonly we will not show all the colours just the one selected and for that we use this.value colour class*/
             _renderReadonly: function () {
             var className = "o_color_pill active readonly o_color_" + this.value;
             this.$el.append($('<span>', {
             'class': className,
             }));
         },
/* we are using o_color_pill class on each colour and then calling trigger on click to run the below function to set the value */
/* after we set the value the render function run again and update the view with selected option */
         clickPill: function (ev) {
             var $target = $(ev.currentTarget);
             var data = $target.data();
             this._setValue(data.val.toString());
        }
    }); // closing AbstractField
    fieldRegistry.add('int_color', colorField);
    return {
     colorField: colorField,
    };
    }); // closing 'my_field_widget' namespace
