let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - method with multiple return values', function(done) {
        let mockObject = {
            multiValueMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'first', 'second', 'third');
                }, 10);
            }
        };
        
        q.npost(mockObject, 'multiValueMethod', [])
            .then(function(result) {
                // npost should return only the first non-error argument
                assert.equal(result, 'first');
                done();
            })
            .catch(done);
    });
});