let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - function returning a value', function(done) {
        function getValue() {
            return this.data;
        }
        
        let obj = { data: 'hello world' };
        let boundFunction = q.fbind(getValue, obj);
        
        boundFunction().then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
});