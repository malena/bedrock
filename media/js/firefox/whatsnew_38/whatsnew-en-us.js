/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function(){
    'use strict';

    var $pageContent = $('#outer-wrapper');
    var $videoContent = $('#video-content');
    var $modalContent = $videoContent.find('#modal-content');
    var videoTitle = $videoContent.find('h2').text();
    var $video = $('#campaign-video');
    var $videoThumbnail = $videoContent.find('.video-thumbnail');

    // show video modal on page load only for those locales who have it
    if ($videoContent.length === 1) {

        Mozilla.Modal.createModal($pageContent[0], $modalContent, {
            title: videoTitle
        });

        // auto close the modal after video finishes
        $video.on('pause', function() {
            // 'pause' event fires just before 'ended', so
            // using 'ended' results in extra pause tracking.
            if ($video[0].currentTime === $video[0].duration) {
                setTimeout(function() {
                    Mozilla.Modal.closeModal();
                }, 500);
            }
         });
    }

    // hide thumbnail and play video on click
    $videoThumbnail.on('click', function (e) {
        e.preventDefault();
        $videoThumbnail.addClass('hidden');
        setTimeout(function() {
            $video[0].play();
        }, 150);
    });
});
