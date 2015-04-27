/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var domain = casper.cli.get('domain') || 'http://localhost:8000';
var locale = casper.cli.get('locale') || 'en-US';

var Config = {};

Config.locale = locale;
Config.domain = domain;

/*
 * Returns the environment being tested
 * plus the specified locale.
 * e.g. 'http://localhost:8000/en-US'
 */
Config.base = function() {
    return domain + '/' + locale;
};

module.exports = Config;
