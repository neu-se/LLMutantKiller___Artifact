let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - successful method call', function(done) {
        // Create a test object with methods
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            greet: function(name) {
                return 'Hello, ' + name;
            }
        };
        
        // Create a promise for the object
        let promise = q.makePromise(testObj);
        
        // Test invoking the add method
        promise.invoke('add', 5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });

    })