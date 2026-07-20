let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - without handlers', function(done) {
        let resolver;
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then().then(function(value) {
            assert.equal(value, 'passthrough');
            done();
        }).catch(done);
        
        resolver.resolve('passthrough');
    });
});