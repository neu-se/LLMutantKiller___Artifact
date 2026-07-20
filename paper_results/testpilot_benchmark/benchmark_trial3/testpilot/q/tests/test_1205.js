let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method returning multiple values', function(done) {
        let mockObject = {
            multiValueMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'first', 'second', 'third');
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });
        
        promisedObject.npost('multiValueMethod', [])
            .then(function(result) {
                // npost should return only the first result value
                assert.equal(result, 'first');
                done();
            })
            .catch(done);
    });
});