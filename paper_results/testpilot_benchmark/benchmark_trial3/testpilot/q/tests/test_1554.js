let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with simple generator', function(done) {
        const asyncFn = q.async(function* () {
            return 42;
        });
        
        asyncFn().then(function(result) {
            assert.equal(result, 42);
            done();
        }).catch(done);
    });
});