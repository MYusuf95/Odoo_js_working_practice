odoo.define('odoo_js_tutorial.AbstractWebClient', function (require) {
    "use strict";

/**
 * AbstractWebClient Override Method for Page Title
 */

var session = require('web.session');
var AbstractWebClient = require('web.AbstractWebClient');

AbstractWebClient.include({
    _title_changed: function () {
        this._super();
        var company_name = session.user_companies.current_company[1];
        document.title = company_name;
        console.log('_title_changed function');
    },
});

return AbstractWebClient;

});