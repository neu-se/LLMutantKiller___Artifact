let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - no arguments', function(done) {
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        let promisifiedFn = q.denodeify(mockNoArgsFunction);
        
        promisifiedFn.nfapply([])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });

    })