let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with no args', function(done) {
        let noArgsObject = {
            post: function(name, args) {
                return q.resolve({ methodCalled: name, argsReceived: args });
            }
        };
        
        q.post(noArgsObject, 'noArgsMethod', undefined)
            .then(function(result) {
                assert.equal(result.methodCalled, 'noArgsMethod');
                assert.equal(result.argsReceived, undefined);
                done();
            })
            .catch(done);
    });
});