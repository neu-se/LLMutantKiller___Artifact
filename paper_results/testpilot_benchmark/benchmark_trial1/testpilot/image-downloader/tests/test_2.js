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

    it('should pass through additional options', function(done) {
        sandbox.stub(image_downloader, 'image').callsFake(function(options) {
            assert.strictEqual(options.extractFilename, true);
            assert.strictEqual(options.timeout, 5000);
            assert.strictEqual(options.headers['User-Agent'], 'test-agent');
            return Promise.resolve({
                filename: 'test.jpg',
                path: '/tmp/test.jpg'
            });
        });

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

    })