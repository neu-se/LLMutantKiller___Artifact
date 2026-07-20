let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    
    it('should pass through additional options', function(done) {
        // Create a mock implementation that captures the options
        const originalImage = image_downloader.image;
        let capturedOptions;
        
        image_downloader.image = function(options) {
            capturedOptions = options;
            return Promise.resolve({
                filename: 'test.jpg',
                path: '/tmp/test.jpg'
            });
        };

        image_downloader.image({
            url: 'https://example.com/test.jpg',
            dest: '/tmp/',
            timeout: 5000,
            headers: { 'User-Agent': 'test-agent' }
        }).then(function(result) {
            // Restore original method
            image_downloader.image = originalImage;
            
            // Verify the options were passed through
            assert.strictEqual(capturedOptions.url, 'https://example.com/test.jpg');
            assert.strictEqual(capturedOptions.dest, '/tmp/');
            assert.strictEqual(capturedOptions.timeout, 5000);
            assert.strictEqual(capturedOptions.headers['User-Agent'], 'test-agent');
            
            // Verify the result
            assert.ok(result.filename);
            assert.ok(result.path);
            done();
        }).catch(function(err) {
            // Restore original method in case of error
            image_downloader.image = originalImage;
            done(err);
        });
    });

});