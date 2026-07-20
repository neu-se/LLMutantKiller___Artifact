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
        }).then(function() {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            // Verify that an error was thrown (the specific error message may vary)
            assert(error instanceof Error, 'Expected an Error object');
            assert(error.message.length > 0, 'Expected error message to be non-empty');
            done();
        });
    });
});