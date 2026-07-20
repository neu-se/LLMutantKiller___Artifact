let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise - immediate resolve', function(done) {
        let promise = q.Promise(function(resolve, reject) {
            resolve(42);
        });
        
        promise.then(function(value) {
            assert.equal(value, 42);
            done();
        }).catch(done);
    });
});