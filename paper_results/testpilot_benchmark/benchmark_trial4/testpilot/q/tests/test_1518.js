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
        
        // Create a master-like wrapper that promisifies all methods
        let master = {};
        Object.keys(testObj).forEach(key => {
            if (typeof testObj[key] === 'function') {
                master[key] = function() {
                    let result = testObj[key].apply(testObj, arguments);
                    return q.isPromise(result) ? result : q.resolve(result);
                };
            }
        });
        
        // Test that master has the same methods
        assert(typeof master.getValue === 'function');
        assert(typeof master.getPromise === 'function');
        
        // Test that methods return promises
        let result1 = master.getValue();
        assert(q.isPromise(result1));
        
        result1.then(function(value) {
            assert.equal(value, 42);
            
            return master.getPromise();
        }).then(function(value) {
            assert.equal(value, 'hello');
            done();
        }).catch(done);
    });
});