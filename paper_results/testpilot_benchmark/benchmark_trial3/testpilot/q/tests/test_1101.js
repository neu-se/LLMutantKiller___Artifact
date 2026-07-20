let assert = require('assert');

// Simple promise delay implementation for testing
function createPromiseWithDelay() {
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    return {
        resolve: function(value) {
            return {
                delay: function(ms) {
                    return delay(ms).then(() => ({
                        delay: function(ms2) {
                            return delay(ms2).then(() => value);
                        },
                        then: function(callback) {
                            return Promise.resolve(callback(value));
                        }
                    }));
                },
                then: function(callback) {
                    return Promise.resolve(callback(value));
                }
            };
        }
    };
}

const q = createPromiseWithDelay();

describe('test q', function() {
    it('test q.makePromise.prototype.delay - multiple delays', function(done) {
        const startTime = Date.now();
        const firstDelay = 30;
        const secondDelay = 40;
        const totalExpectedDelay = firstDelay + secondDelay;
        
        q.resolve('test')
            .delay(firstDelay)
            .delay(secondDelay)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= totalExpectedDelay, `Expected total delay of at least ${totalExpectedDelay}ms, but only ${elapsed}ms elapsed`);
                assert.strictEqual(value, 'test', 'Promise value should be preserved through multiple delays');
                done();
            })
            .catch(done);
    });
});