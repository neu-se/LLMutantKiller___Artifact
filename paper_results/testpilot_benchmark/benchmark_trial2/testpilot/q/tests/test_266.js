let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - empty arguments', function(done) {
        // Create a mock function with no arguments except callback
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        let promisifiedFunction = q.denodeify(mockNoArgsFunction);
        
        // Test nfapply with empty arguments array
        promisifiedFunction.nfapply([])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });

    })