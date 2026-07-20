let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with function returning undefined', function(done) {
        function returnUndefined() {
            return undefined;
        }
        
        q.fcall(returnUndefined)
            .then(function(result) {
                assert.equal(result, undefined);
                done();
            })
            .catch(done);
    });
});