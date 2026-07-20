let mocha = require('mocha');
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
        let promise = q.fulfill(testObj);
        
        let result1 = promise.post('multiply', [3, 4]);
        let result2 = promise.post('greet', ['World']);
        
        assert.strictEqual(result1, 12);
        assert.strictEqual(result2, 'Hello, World');
        done();
    });

    })