let mocha = require('mocha');
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
        
        q.fapply(obj.getValue, [])
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
});