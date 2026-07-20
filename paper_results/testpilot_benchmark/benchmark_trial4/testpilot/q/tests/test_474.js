let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - progress case', function(done) {
        let resolver;
        let progressValues = [];
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            assert.equal(value, 'final');
            assert.deepEqual(progressValues, [10, 50, 90]);
            done();
        }, function(error) {
            done(error);
        }, function(progress) {
            progressValues.push(progress);
        });
        
        resolver.notify(10);
        resolver.notify(50);
        resolver.notify(90);
        resolver.resolve('final');
    });
});