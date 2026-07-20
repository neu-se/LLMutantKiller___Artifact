let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with fulfilled promise', function(done) {
        let promise = q.resolve('success');
        let catchHandlerCalled = false;
        
        q.catch(promise, function(error) {
            catchHandlerCalled = true;
            return 'should not reach here';
        }).then(function(result) {
            assert.strictEqual(result, 'success');
            assert.strictEqual(catchHandlerCalled, false);
            done();
        }).catch(done);
    });

    })