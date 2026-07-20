let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with empty array', function(done) {
        let promises = [];
        
        q(promises).allSettled().then(function(states) {
            assert.equal(states.length, 0);
            assert(Array.isArray(states));
            done();
        }).catch(done);
    });

    })