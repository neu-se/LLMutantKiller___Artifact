let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with no arguments', function(done) {
        let testObject = {
            getName: function() {
                return 'test';
            }
        };
        
        q.dispatch(testObject, 'getName', [])
            .then(function(result) {
                assert.equal(result, 'test');
                done();
            })
            .catch(done);
    });
});