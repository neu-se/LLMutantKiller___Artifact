let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with non-promise object', function(done) {
        let progressCalled = false;
        let plainObject = 'not a promise';
        
        q.progress(plainObject, function(progress) {
            progressCalled = true;
        }).then(function(result) {
            assert.equal(result, 'not a promise');
            assert.equal(progressCalled, false); // Progress should not be called for non-promise
            done();
        }).catch(done);
    });

    })