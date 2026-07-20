let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with non-promise object', function(done) {
        let finallyCallbackCalled = false;
        let value = 'plain value';
        
        q.finally(value, function() {
            finallyCallbackCalled = true;
        }).then(function(result) {
            assert.strictEqual(result, value);
            assert.strictEqual(finallyCallbackCalled, true);
            done();
        }).catch(done);
    });
    
    })