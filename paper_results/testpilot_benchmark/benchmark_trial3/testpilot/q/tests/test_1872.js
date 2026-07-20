let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with context preservation', function(done) {
        let obj = {
            value: 42,
            getValue: function() {
                return this.value;
            }
        };
        
        let boundGetValue = q.fbind(obj.getValue, obj);
        let result = boundGetValue();
        
        result.then(function(value) {
            assert.equal(value, 42);
            done();
        }).catch(done);
    });
});