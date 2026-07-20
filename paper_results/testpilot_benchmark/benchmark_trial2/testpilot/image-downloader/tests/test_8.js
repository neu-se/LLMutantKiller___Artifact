let mocha = require('mocha');
let assert = require('assert');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    
    it('should handle error cases', function(done) {
        // Test with an invalid URL that should cause the download to fail
        image_downloader.image({
            url: 'https://invalid-url-that-does-not-exist-12345.com/nonexistent.jpg',
            dest: '/tmp/'
        }).then(function(result) {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            // Verify that an error was thrown
            assert(error instanceof Error);
            assert(error.message.length > 0);
            done();
        });
    });
});