let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should work with null/undefined values', function(done) {
        let promise = q.resolve(null);
        
        promise.get('property').then(function() {
            done(new Error('Should not resolve when getting property of null'));
        }).catch(function(error) {
            assert(error instanceof TypeError);
            done();
        });
    });
});