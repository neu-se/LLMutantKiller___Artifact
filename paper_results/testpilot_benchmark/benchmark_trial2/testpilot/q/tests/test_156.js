let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method with no arguments', function(done) {
        let mockObject = {
            getValue: function(callback) {
                setTimeout(() => {
                    callback(null, 'test value');
                }, 10);
            }
        };
        
        let promisifiedGetValue = q.nfbind(mockObject.getValue);
        
        promisifiedGetValue()
            .then(result => {
                assert.strictEqual(result, 'test value');
                done();
            })
            .catch(done);
    });
});