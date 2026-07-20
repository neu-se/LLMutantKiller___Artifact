let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with multiple arguments', function(done) {
        let mockObject = {
            multiArgMethod: function(a, b, c, callback) {
                setTimeout(() => {
                    callback(null, a * b * c);
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });
        
        promisedObject.npost('multiArgMethod', [2, 3, 4])
            .then(function(result) {
                assert.equal(result, 24);
                done();
            })
            .catch(done);
    });
});