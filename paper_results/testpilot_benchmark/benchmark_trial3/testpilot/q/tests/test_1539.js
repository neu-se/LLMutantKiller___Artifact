let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that takes parameters', function(done) {
        function* testGenerator(x, y) {
            let result1 = yield q.resolve(x * 2);
            let result2 = yield q.resolve(y * 3);
            return result1 + result2;
        }
        
        let asyncFn = q.async(testGenerator);
        asyncFn(5, 4).then(function(result) {
            assert.equal(result, 22); // (5*2) + (4*3) = 10 + 12 = 22
            done();
        }).catch(done);
    });

    })