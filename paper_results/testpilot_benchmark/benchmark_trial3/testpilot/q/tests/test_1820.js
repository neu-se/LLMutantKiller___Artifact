let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with method and context', function(done) {
        var obj = {
            value: 10,
            getValue: function() {
                return this.value;
            }
        };
        
        q.fapply(obj.getValue.bind(obj), [])
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
});