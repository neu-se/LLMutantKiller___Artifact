let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - basic operation', function(done) {
        // Create a simple object with methods to dispatch to
        let testObject = {
            getValue: function() {
                return 42;
            },
            add: function(a, b) {
                return a + b;
            },
            asyncOperation: function() {
                return q.delay(10).then(() => 'async result');
            }
        };
        
        // Create a promise using makePromise
        let promise = q.makePromise(testObject);
        
        // Test dispatching a simple method
        let result = promise.dispatch('getValue', []);
        
        result.then(function(value) {
            assert.strictEqual(value, 42);
            done();
        }).catch(done);
    });
});