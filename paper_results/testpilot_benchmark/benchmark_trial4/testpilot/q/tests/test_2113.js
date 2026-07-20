let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle already resolved promise', function(done) {
        let promise = q.resolve('immediate');
        
        q.timeout(promise, 100)
            .then(result => {
                assert.equal(result, 'immediate');
                done();
            })
            .catch(done);
    });

    })