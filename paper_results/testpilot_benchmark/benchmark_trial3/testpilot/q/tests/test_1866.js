let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind preserves this context', function(done) {
        let obj = {
            value: 42,
            getValue: function() {
                return this.value;
            }
        };
        
        let boundGetValue = q.fbind(obj.getValue);
        let result = boundGetValue.call(obj);
        
        q.when(result).then(function(value) {
            assert.equal(value, 42);
            done();
        }).catch(done);
    });
});