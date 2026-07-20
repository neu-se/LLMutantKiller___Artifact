let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - post method calls functions with name', function(done) {
        let testObj = {
            multiply: function(a, b) {
                return a * b;
            },
            greet: function(name) {
                return 'Hello, ' + name;
            }
        };
        let promise = q(testObj);
        
        let result1Promise = promise.post('multiply', [3, 4]);
        let result2Promise = promise.post('greet', ['World']);
        
        q.all([result1Promise, result2Promise]).then(function(results) {
            assert.strictEqual(results[0], 12);
            assert.strictEqual(results[1], 'Hello, World');
            done();
        }).catch(done);
    });
});