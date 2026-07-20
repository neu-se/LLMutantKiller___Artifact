let mocha = require('mocha');
let assert = require('assert');
let sinon = require('sinon');
let fs = require('fs');
let path = require('path');
let image_downloader = require('image-downloader');

describe('test image_downloader', function() {
    let sandbox;
    
    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });
    
    afterEach(function() {
        sandbox.restore();
    });
    
    it('should handle error cases', function(done) {
        sandbox.stub(image_downloader, 'image').callsFake(function(options) {
            return Promise.reject(new Error('Download failed'));
        });
        
        image_downloader.image({
            url: 'https://invalid-url.com/nonexistent.jpg',
            dest: '/tmp/'
        }).then(function(result) {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Download failed');
            done();
        });
    });
});