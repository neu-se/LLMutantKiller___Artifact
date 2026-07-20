let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with resolved value', function(done) {
        let value = 42;
        q.when(value, 
            function(result) {
                assert.equal(result, 42);
                done();
            },
            function(error) {
                done(error);
            }
        );
    });
});