let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with function object', function(done) {
        let testFunction = function(x) { return x * 2; };
        testFunction.customProp = 'custom';
        
        let master = q.master(testFunction);
        
        // Test function invocation
        master.fcall(5).then(function(result) {
            assert.strictEqual(result, 10, 'should handle function objects correctly');
            done();
        }).catch(done);
    });

    })