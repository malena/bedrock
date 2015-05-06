.. This Source Code Form is subject to the terms of the Mozilla Public
.. License, v. 2.0. If a copy of the MPL was not distributed with this
.. file, You can obtain one at http://mozilla.org/MPL/2.0/.

.. _testing:

==================
Functional testing
==================

Bedrock runs a suite of front-end functional tests using `CasperJS`_.

Prerequisites
-------------

`PhantomJS`_ is a headless web browser used to power CasperJS. We currently recommend
installing `PhantomJS 1.9.8`_.

To test that you have PhantomJS installed correctly, you can run the following command::

    phantomjs --version

This should output the following::

    1.9.8

Depending on your operating system, you may need to set a PATH for the PhantomJS executable.
On OSX, assuming ``/usr/local/bin/`` is in your PATH, you can create a symbolic link to the
PhantomJS executable like so::

    ln -s /path/to/phantomjs /usr/local/bin/

Installation
------------

To install CasperJS, please see the `instruction here <http://docs.casperjs.org/en/1.1-beta2/installation.html>`_.
You are free to install it via any of the methods described, but for convenience we suggest using npm::

    npm install -g casperjs@1.1.0-beta3

.. Note::

    The ``-g`` flag makes the ``casperjs`` executable available system-wide.

To test that you have CasperJS installed and running together with the correct version
of PhantomJS, you can run the following command::

    casperjs

You should now see output similar to::

    CasperJS version 1.1.0-beta3 at /usr/local/lib/node_modules/casperjs, using phantomjs version 1.9.8

Running tests
-------------

To run the bedrock tests against your local bedrock instance, type::

    casperjs test tests/functional --config=tests/config.json

This will run all test files found in the ``tests/functional`` directory and assumes you
have bedrock running at ``localhost`` on port ```8000``

To run a single test::

    casperjs test tests/functional/home.js --config=tests/config.json

You can also easily run the tests against any bedrock environment. For example:

To run tests against dev::

    casperjs test tests/functional --domain=https://www-dev.allizom.org --config=tests/config.json

To run tests against stage::

    casperjs test tests/functional --domain=https://www.allizom.org --config=tests/config.json

To run tests against prod::

    casperjs test tests/functional --domain=https://www.mozilla.org --config=tests/config.json

Debugging
---------

You can enable logging on the command line by passing the following additional flags::

    --verbose --log-level=debug

.. _CasperJS: http://casperjs.org/
.. _PhantomJS: http://phantomjs.org/
.. _PhantomJS 1.9.8: https://bitbucket.org/ariya/phantomjs/downloads
