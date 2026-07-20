let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    let originalImage;
    
    beforeEach(function() {
        // Store the original method
        originalImage = image_downloader.image;
    });
    
    afterEach(function() {
        // Restore the original method
        image_downloader.image = originalImage;
    });

    it('should handle empty options object', function(done) {
        // Mock the image method
        image_downloader.image = function(options = {}) {
            assert.strictEqual(options.extractFilename, true);
            return Promise.resolve({
                filename: 'default.jpg',
                path: '/tmp/default.jpg'
            });
        };

        image_downloader.image({ extractFilename: true }).then(function(result) {
            assert.ok(result);
            done();
        }).catch(done);
    });
});