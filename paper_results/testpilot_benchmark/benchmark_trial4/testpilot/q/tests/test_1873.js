let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with context binding', function(done) {
        let obj = {
            value: 10,
            multiply: function(factor) {
                return this.value * factor;
            }
        };
        
        let boundFunc = q.fbind(obj.multiply, 3);
        let result = boundFunc.call(obj);
        
        q.when(result).then(function(value) {
            assert.equal(value, 30);
            done();
        }).catch(done);
    });
    
    })