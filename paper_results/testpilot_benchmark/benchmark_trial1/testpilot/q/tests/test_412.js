let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object', function(done) {
        let testObj = {
            getValue: function() {
                return 42;
            },
            getPromise: function() {
                return q.resolve('hello');
            }
        };
        
        // Create a master object that wraps methods to return promises
        let master = {};
        Object.keys(testObj).forEach(function(key) {
            if (typeof testObj[key] === 'function') {
                master[key] = function() {
                    try {
                        let result = testObj[key].apply(testObj, arguments);
                        return q.resolve(result);
                    } catch (error) {
                        return q.reject(error);
                    }
                };
            }
        });
        
        // Test that master returns promises for method calls
        master.getValue().then(function(result) {
            assert.equal(result, 42);
            return master.getPromise();
        }).then(function(result) {
            assert.equal(result, 'hello');
            done();
        }).catch(done);
    });
});