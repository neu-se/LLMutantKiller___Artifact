let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fcall error handling', function(done) {
        // Test when the resolved value is not a function
        let notAFunction = "this is not a function";
        let promise = q.resolve(notAFunction);
        
        promise.fcall().catch(function(err) {
            assert(err instanceof TypeError);
            done();
        });
    });
});