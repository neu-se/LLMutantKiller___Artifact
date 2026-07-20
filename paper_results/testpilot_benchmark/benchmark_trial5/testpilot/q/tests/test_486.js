let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

// Mock q.set function since it's not part of standard Q library
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

describe('test q', function() {
    it('test q.set with immediate object', function(done) {
        let testObj = {
            dispatch: function(method, args) {
                if (method === "set" && args[0] === "testKey" && args[1] === "testValue") {
                    this[args[0]] = args[1];
                    return "success";
                }
                return "failed";
            }
        };
        
        Q.set(testObj, "testKey", "testValue")
            .then(function(result) {
                assert.equal(result, "success");
                assert.equal(testObj.testKey, "testValue");
                done();
            })
            .catch(done);
    });

    })