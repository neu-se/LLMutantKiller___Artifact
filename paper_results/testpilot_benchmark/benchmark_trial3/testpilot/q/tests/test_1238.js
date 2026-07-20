let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - no arguments to method', function(done) {
        const mockObject = {
            noArgsMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'success');
                }, 10);
            }
        };

        const promise = q(mockObject);
        
        promise.ninvoke('noArgsMethod')
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});