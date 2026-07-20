let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with no arguments', function(done) {
        let descriptor = {
            fargs: function() {
                return [];
            },
            fcall: function(args) {
                return 'no args result';
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc()
            .then(function(result) {
                assert.equal(result, 'no args result');
                done();
            })
            .catch(done);
    });
});