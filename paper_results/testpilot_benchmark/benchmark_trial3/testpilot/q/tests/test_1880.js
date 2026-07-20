let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with multiple pre-bound arguments', function(done) {
        function concat(a, b, c) {
            return a + b + c;
        }
        
        let boundConcat = q.fbind(concat, 'Hello', ' ');
        let result = boundConcat('World');
        
        q.when(result).then(function(value) {
            assert.equal(value, 'Hello World');
            done();
        }).catch(done);
    });
});