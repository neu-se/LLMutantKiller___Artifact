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
            name: 'initial',
            dispatch: function(method, args) {
                if (method === 'set') {
                    this[args[0]] = args[1];
                    return this[args[0]];
                }
            }
        };
        
        Q.set(testObj, 'name', 'updated')
            .then(function(result) {
                assert.equal(result, 'updated');
                assert.equal(testObj.name, 'updated');
                done();
            })
            .catch(done);
    });
    
    })