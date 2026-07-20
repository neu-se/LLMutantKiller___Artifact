let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with basic generator', function(done) {
        // Test basic async generator that yields promises
        var asyncAdd = q.async(function* (a, b) {
            var first = yield q.resolve(a);
            var second = yield q.resolve(b);
            return first + second;
        });
        
        asyncAdd(5, 3).then(function(result) {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
    
    })