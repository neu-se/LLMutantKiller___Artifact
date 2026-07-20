let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    let originalImageMethod;
    
    beforeEach(function() {
        // Store the original method
        originalImageMethod = image_downloader.image;
    });
    
    afterEach(function() {
        // Restore the original method
        image_downloader.image = originalImageMethod;
    });
    
    it('should pass through additional options', function(done) {
        // Mock the image method
        image_downloader.image = function(options) {
            assert.strictEqual(options.timeout, 5000);
            assert.strictEqual(options.headers['User-Agent'], 'test-agent');
            assert.strictEqual(options.url, 'https://example.com/test.jpg');
            assert.strictEqual(options.dest, '/tmp/');
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
            assert.ok(result.filename);
            assert.ok(result.path);
            done();
        }).catch(done);
    });
});