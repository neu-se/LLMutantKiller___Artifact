let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should call finally callback when promise rejects', function(done) {
            let finallyCalled = false;
            let rejectionReason = new Error('test error');
            
            q.reject(rejectionReason)
                .finally(function() {
                    finallyCalled = true;
                })
                .then(function() {
                    done(new Error('Promise should have been rejected'));
                }, function(reason) {
                    assert.strictEqual(finallyCalled, true, 'Finally callback should be called');
                    assert.strictEqual(reason, rejectionReason, 'Original rejection reason should be preserved');
                    done();
                })
                .catch(done);
        });

            })
})