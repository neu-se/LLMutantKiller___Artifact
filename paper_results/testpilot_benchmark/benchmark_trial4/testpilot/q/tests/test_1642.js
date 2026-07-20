let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with promise-returning method', function(done) {
        let testObject = {
            asyncMethod: function(value) {
                return q.resolve(value * 2);
            }
        };
        
        q.dispatch(testObject, 'asyncMethod', [5])
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
});