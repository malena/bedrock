/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var require = patchRequire(require);
var config = require('../lib/config');
var Helper = {};

/**
 * Casper/PhantomJS cannot open relative links,
 * so we need to convert bedrock links to absolute paths
 * @param: {url} String.
 */
Helper.getAbsoluteLink = function(url) {
    if (!/^https?\:\/\/[^/]+/.test(url)) {
        url = config.domain + url;
    }
    return url;
};

/**
 * Iterates through an array of URL's and checks each
 * one for a valid HTTP 200 response.
 * @param {urls} Array of URLs.
 */
Helper.testHttpResponses = function(urls) {
    casper.each(urls, function(self, url) {
        url = Helper.getAbsoluteLink(url);
        self.thenOpen(url, function() {
            self.test.assertHttpStatus(200, 'HTTP 200: ' + url);
        });
    });
};

module.exports = Helper;
