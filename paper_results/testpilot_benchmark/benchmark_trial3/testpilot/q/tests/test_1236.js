let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method with multiple arguments', function(done) {
        const mockObject = {
            multiArgMethod: function(a, b, c, callback) {
                setTimeout(() => {
                    callback(null, `${a}-${b}-${c}`);
                }, 10);
            }
        };

        const promise = q(mockObject);
        
        promise.ninvoke('multiArgMethod', 'hello', 'world', '!')
            .then(result => {
                assert.strictEqual(result, 'hello-world-!');
                done();
            })
            .catch(done);
    });

    })