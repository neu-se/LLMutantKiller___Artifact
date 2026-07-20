let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with parameters', function(done) {
        const asyncFn = q.async(function* (x, y) {
            const result = yield q.resolve(x * y);
            return result + 1;
        });
        
        asyncFn(5, 6).then(function(result) {
            assert.equal(result, 31);
            done();
        }).catch(done);
    });

    })