let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with promise-returning method', function(done) {
        let testObject = {
            asyncAdd: function(a, b) {
                return q.resolve(a + b);
            }
        };
        
        q.ninvoke(testObject, 'asyncAdd', 10, 20)
            .then(function(result) {
                assert.equal(result, 30);
                done();
            })
            .catch(done);
    });
});