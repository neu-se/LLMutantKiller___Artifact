let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allResolved with empty array', function(done) {
        let allPromise = q.allSettled([]);
        
        allPromise.allResolved().then(function(results) {
            assert.equal(results.length, 0);
            assert(Array.isArray(results));
            done();
        }).catch(done);
    });

    })