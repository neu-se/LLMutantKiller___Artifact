let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with no arguments', function(done) {
        function noArgsFunction() {
            return 'hello world';
        }
        
        q.fapply(noArgsFunction, [])
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});