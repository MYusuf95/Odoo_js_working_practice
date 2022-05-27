odoo.define('odoo_js_tutorial.odoo_tutorial', function (require) {
    'use strict'

    var FormController = require('web.FormController'); /* This is needed to manuplate and use js on forms*/

    var ExtendFormController = FormController.include({  /*Form will run like default also run the below function on save as saveRecord is used*/
        saveRecord: function () {
            var res = this._super.apply(this, arguments);
            if (this.modelName == 'odoo.tutorial') {
                self = this;   /*We need this to pass this/self in conrtext */
                var localDataValues =Object.values(self.model.localData)
                var params =localDataValues[0]["data"]
                self._rpc({
                    model: 'odoo.tutorial',
                    method: 'search_read',
                    fields: ['name', 'number_of_videos'],
                    domain: [['id', '=', params['id']]],
                    context: self.context,
                }).then(function (result) {
                    if (result[0]['number_of_videos'] == 0) {
                        self.do_notify('Warning', 'Last Number of videos is 0');
                    }
                    if (localDataValues.at(-1)._changes){
                    if (localDataValues.at(-1)._changes.number_of_videos == 0){
                        self.do_notify('Warning', 'Current Number of videos is 0');
                    }
                    }
                })
            }
            return res;
        }
    });
});