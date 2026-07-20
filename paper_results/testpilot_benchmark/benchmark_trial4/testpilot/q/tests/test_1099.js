let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - chaining multiple delays', function(done) {
        const startTime = Date.now();
        const delay1 = 50;
        const delay2 = 50;
        
        q.resolve('chained')
            .delay(delay1)
            .delay(delay2)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= (delay1 + delay2), `Expected total delay of at least ${delay1 + delay2}ms`);
                assert.strictEqual(value, 'chained', 'Value should be preserved through multiple delays');
                done();
            }).catch(done);
    });
});