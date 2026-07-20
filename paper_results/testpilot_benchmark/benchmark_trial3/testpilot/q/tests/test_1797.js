let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with simple method', function(done) {
        let testObject = {
            getValue: function() {
                return 'hello world';
            }
        };
        
        q.invoke(testObject, 'getValue')
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});