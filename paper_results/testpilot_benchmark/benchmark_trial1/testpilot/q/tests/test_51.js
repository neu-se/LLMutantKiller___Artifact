let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let descriptor = {
            when: function(fulfilled, rejected) {
                // For successful resolution, call fulfilled with the value
                if (fulfilled) {
                    fulfilled('resolved value');
                }
                // For error case, you would call rejected(error)
                // rejected(new Error('test error'));
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        promise.then(function(value) {
            assert.equal(value, 'resolved value');
            done();
        }).catch(done);
    });
});