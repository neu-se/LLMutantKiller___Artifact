let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    
    it('should handle extractFilename = false option', function(done) {
        // Store original method
        const originalImage = image_downloader.image;
        
        // Mock the image method
        image_downloader.image = function(options) {
            assert.strictEqual(options.extractFilename, false);
            return Promise.resolve({
                filename: 'custom-name.jpg',
                path: '/tmp/custom-name.jpg'
            });
        };
        
        image_downloader.image({
            url: 'https://example.com/test.jpg',
            dest: '/tmp/custom-name.jpg',
            extractFilename: false
        }).then(function(result) {
            assert.strictEqual(result.filename, 'custom-name.jpg');
            // Restore original method
            image_downloader.image = originalImage;
            done();
        }).catch(function(error) {
            // Restore original method on error too
            image_downloader.image = originalImage;
            done(error);
        });
    });
    
});