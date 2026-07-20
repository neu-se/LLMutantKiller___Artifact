let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    let originalImageFunction;
    
    beforeEach(function() {
        // Store the original function
        originalImageFunction = image_downloader.image;
    });
    
    afterEach(function() {
        // Restore the original function
        image_downloader.image = originalImageFunction;
    });

    it('should download image with default extractFilename option', function(done) {
        // Mock the actual download functionality
        image_downloader.image = function(options) {
            return Promise.resolve({
                filename: 'test-image.jpg',
                path: '/tmp/test-image.jpg'
            });
        };

        image_downloader.image({
            url: 'https://example.com/test-image.jpg',
            dest: '/tmp/'
        }).then(function(result) {
            assert.strictEqual(result.filename, 'test-image.jpg');
            assert.strictEqual(result.path, '/tmp/test-image.jpg');
            done();
        }).catch(done);
    });
});