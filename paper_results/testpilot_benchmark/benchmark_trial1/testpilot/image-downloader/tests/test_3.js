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

    it('should handle empty options object', function(done) {
        sandbox.stub(image_downloader, 'image').callsFake(function(options) {
            assert.strictEqual(options.extractFilename, true);
            return Promise.resolve({
                filename: 'default.jpg',
                path: '/tmp/default.jpg'
            });
        });

        image_downloader.image().then(function(result) {
            assert.ok(result);
            done();
        }).catch(done);
    });

    })