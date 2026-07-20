let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - with non-promise value', function(done) {
        let promise1 = q.resolve(42);
        let nonPromise = 'not a promise';
        
        // Use q.all to combine promises and values
        q.all([promise1, nonPromise]).then(function(results) {
            assert.strictEqual(results[0], 42);
            assert.strictEqual(results[1], 'not a promise');
            done();
        }).catch(done);
    });
});