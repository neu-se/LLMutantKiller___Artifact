let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with inspect function', function(done) {
        let inspectCalled = false;
        let inspectArgs = null;
        
        let descriptor = {
            fargs: function(a, b) {
                return [a, b];
            },
            fcall: function(args) {
                return args[0] * args[1];
            }
        };
        
        let inspect = function(reason, args) {
            inspectCalled = true;
            inspectArgs = args;
            return 'inspected';
        };
        
        let promiseFunc = q.makePromise(descriptor, null, inspect);
        
        promiseFunc(4, 7)
            .then(function(result) {
                assert.equal(result, 28);
                // In this case, inspect shouldn't be called since there's no error
                done();
            })
            .catch(done);
    });

    })