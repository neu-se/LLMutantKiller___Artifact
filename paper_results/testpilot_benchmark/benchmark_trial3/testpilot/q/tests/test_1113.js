let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - error callback', function(done) {
        // Create a mock function that calls back with an error
        function mockErrorFunction(arg, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        let promisifiedFn = q.denodeify(mockErrorFunction);
        
        promisifiedFn.nfapply(['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });

    })