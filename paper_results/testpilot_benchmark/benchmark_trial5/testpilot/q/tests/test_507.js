let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method call', function(done) {
        // Create a test object with a method
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(x, y) {
                return x * y;
            }
        };
        
        // Test calling add method with arguments [3, 5]
        let promise = q.post(testObj, 'add', [3, 5]);
        
        promise.then(function(result) {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
    
    })