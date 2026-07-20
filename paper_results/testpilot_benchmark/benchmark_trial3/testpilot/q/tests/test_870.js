let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - works with empty array', function(done) {
        let promises = [];
        let combinedPromise = q(promises);
        
        combinedPromise.any().then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert(error instanceof Error);
            done();
        });
    });
    
    })