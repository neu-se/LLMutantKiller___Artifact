let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with no arguments', function(done) {
        function noArgs() {
            return 'success';
        }
        
        q.fapply(noArgs, [])
            .then(function(result) {
                assert.equal(result, 'success');
                done();
            })
            .catch(done);
    });
});