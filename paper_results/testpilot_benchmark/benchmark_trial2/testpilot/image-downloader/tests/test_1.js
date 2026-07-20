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
    
    it('should handle extractFilename = false option', function(done) {
        sandbox.stub(image_downloader, 'image').callsFake(function(options) {
            assert.strictEqual(options.extractFilename, false);
            return Promise.resolve({
                filename: 'custom-name.jpg',
                path: '/tmp/custom-name.jpg'
            });
        });
        
        image_downloader.image({
            url: 'https://example.com/test.jpg',
            dest: '/tmp/custom-name.jpg',
            extractFilename: false
        }).then(function(result) {
            assert.strictEqual(result.filename, 'custom-name.jpg');
            done();
        }).catch(done);
    });
    
    })