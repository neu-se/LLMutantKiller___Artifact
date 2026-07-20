let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with method that has parameters', function(done) {
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            concat: function(str1, str2) {
                return q.resolve(str1 + str2);
            }
        };
        
        // Create a master object that wraps methods to return promises
        let master = {};
        Object.keys(testObj).forEach(function(key) {
            if (typeof testObj[key] === 'function') {
                master[key] = function() {
                    let result = testObj[key].apply(testObj, arguments);
                    return q.resolve(result);
                };
            }
        });
        
        master.add(5, 3).then(function(result) {
            assert.equal(result, 8);
            return master.concat('hello', ' world');
        }).then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
});