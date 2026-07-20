let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with non-array promise', function(done) {
        let promise = q.resolve('not an array');
        
        promise.spread(function() {
            done(new Error('Should not reach fulfilled handler'));
        }, function(error) {
            assert(error instanceof TypeError);
            done();
        });
    });
});