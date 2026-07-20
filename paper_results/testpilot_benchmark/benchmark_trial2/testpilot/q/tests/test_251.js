let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done - basic fulfilled case', function(done) {
        let fulfilled = false;
        
        q.resolve('test value')
            .done(function(value) {
                fulfilled = true;
                assert.equal(value, 'test value');
                done();
            });
        
        // Give it a moment to execute
        setTimeout(() => {
            if (!fulfilled) {
                done(new Error('done callback was not called'));
            }
        }, 10);
    });

    })