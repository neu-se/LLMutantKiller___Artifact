let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with object method', function(done) {
        let obj = {
            value: 10,
            getValue: function() {
                return this.value;
            }
        };
        
        // Use q.fbind to bind the context, then call with no arguments
        q.fbind(obj.getValue, obj)()
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
});