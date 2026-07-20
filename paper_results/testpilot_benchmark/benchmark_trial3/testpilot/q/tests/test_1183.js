let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - basic functionality', function(done) {
        // Create a mock node-style callback function
        function mockNodeFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Create a promise using makePromise
        const promiseFunc = q.makePromise(mockNodeFunction);
        
        // Test nbind with context and arguments
        const boundFunc = promiseFunc.nbind(null, 5);
        
        boundFunc(3).then(result => {
            assert.strictEqual(result, 8);
            done();
        }).catch(done);
    });

    })