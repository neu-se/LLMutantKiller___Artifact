let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with no pre-bound arguments', function(done) {
        function simpleFunc(msg) {
            return "Hello " + msg;
        }
        
        let boundFunc = q.fbind(simpleFunc);
        let result = boundFunc("World");
        
        q.when(result).then(function(value) {
            assert.equal(value, "Hello World");
            done();
        }).catch(done);
    });
});