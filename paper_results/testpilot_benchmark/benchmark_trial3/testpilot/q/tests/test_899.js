let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allSettled with single promise', function(done) {
        let promise = q.resolve('single value');
        let allPromise = q.allSettled([promise]);
        
        allPromise.then(function(results) {
            assert.equal(results.length, 1);
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'single value');
            done();
        }).catch(done);
    });
});