let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with no arguments', function(done) {
        let mockFunction = function() {
            return 'called with no args';
        };
        
        let promise = q(mockFunction);
        promise.fcall().then(function(result) {
            assert.equal(result, 'called with no args');
            done();
        }).catch(done);
    });

    })