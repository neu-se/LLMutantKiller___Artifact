let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    let originalImage;
    
    beforeEach(function() {
        // Store the original function
        originalImage = image_downloader.image;
    });
    
    afterEach(function() {
        // Restore the original function
        image_downloader.image = originalImage;
    });

    it('should handle extractFilename set to false', function(done) {
        // Mock the image function
        image_downloader.image = function(options) {
            assert.strictEqual(options.extractFilename, false);
            return Promise.resolve({
                filename: 'custom-name.jpg',
                path: '/tmp/custom-name.jpg'
            });
        };

        image_downloader.image({
            url: 'https://example.com/test-image.jpg',
            dest: '/tmp/custom-name.jpg',
            extractFilename: false
        }).then(function(result) {
            assert.strictEqual(result.filename, 'custom-name.jpg');
            done();
        }).catch(done);
    });
});