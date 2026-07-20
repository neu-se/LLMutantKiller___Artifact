let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with multiple arguments in array', function(done) {
        let promise = q.resolve(['hello', 'world', 42, true]);
        
        q.spread(promise, function(str1, str2, num, bool) {
            assert.equal(str1, 'hello');
            assert.equal(str2, 'world');
            assert.equal(num, 42);
            assert.equal(bool, true);
            done();
        }, function(error) {
            done(error);
        });
    });
});