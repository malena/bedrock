/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var config = require('../lib/config');
var helper = require('../lib/helper');
var path = '/';
var url = config.base() + path;

casper.test.begin('Home page, appearence: ' + url, 8, function suite(test) {

    casper.start(url, function() {

        // Mozilla wordmark
        test.assertExists('.main-header h1');

        // Home page promos
        test.assertElementCount('.promo-grid > li', 16);

        // Contribute CTA button exists
        test.assertExists('#community .contribute-btn');

        // Featured event
        test.assertExists('#upcoming-events .featured-event');

        // Upcoming events list
        test.assertElementCount('#upcoming-events .events-list > li > a', 3);

        // All events CTA button
        test.assertExists('#upcoming-events .more-large');

        // Secondary links
        test.assertElementCount('#secondary-links ul > li > a', 3);

        // Newsletter signup form
        test.assertExists('.footer-newsletter-form');

    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('Home page, promo links: ' + url, 10, function suite(test) {

    casper.start(url, function() {
        var promoLinks = this.getElementsAttribute('.promo-grid > li .panel-link', 'href');
        helper.testHttpResponses(promoLinks, test);

        // test embedded tweet intent links
        var tweetLinks = this.getElementsAttribute('.twt .twt-actions > a', 'href');
        helper.testHttpResponses(tweetLinks, test);
    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('Home page, event links: ' + url, 5, function suite(test) {

    casper.start(url, function() {
        var links = this.getElementsAttribute('#upcoming-events .inner-container a', 'href');
        helper.testHttpResponses(links, test);
    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('Home page, secondary links: ' + url, 3, function suite(test) {

    casper.start(url, function() {
        var links = this.getElementsAttribute('#secondary-links a', 'href');
        helper.testHttpResponses(links, test);
    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('Home page, footer links: ' + url, 16, function suite(test) {

    casper.start(url, function() {
        var links = this.getElementsAttribute('#colophon a', 'href');
        helper.testHttpResponses(links, test);
    });

    casper.run(function() {
        test.done();
    });
});

casper.test.begin('Home page, newsletter submission: ' + url, 1, function suite(test) {

    casper.start(url, function() {
        this.fillSelectors('#mozorg-newsletter-form', {
            '#id_email': 'noreply@mozilla.com',
            '#id_privacy': true
        }, true);
    });

    casper.then(function() {
        this.waitForUrl(/sign-up-for-mozilla/, function() {
            test.assertUrlMatch(/sign-up-for-mozilla/, 'Newsletter submitted successfully');
        });
    });

    casper.run(function() {
        test.done();
    });
});
