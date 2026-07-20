let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with methods that have arguments', function(done) {
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            concat: function(str1, str2, str3) {
                return str1 + str2 + str3;
            }
        };
        
        // Create a master object with promisified methods
        let master = {};
        Object.keys(testObj).forEach(function(key) {
            master[key] = function() {
                let args = Array.prototype.slice.call(arguments);
                return q.Promise(function(resolve) {
                    let result = testObj[key].apply(testObj, args);
                    resolve(result);
                });
            };
        });
        
        master.add(5, 3).then(function(result) {
            assert.equal(result, 8);
            
            return master.concat('hello', ' ', 'world');
        }).then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
});