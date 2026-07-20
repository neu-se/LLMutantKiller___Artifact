let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that yields non-promise values', function(done) {
        function* testGenerator() {
            let value1 = yield 10;
            let value2 = yield 20;
            return value1 + value2;
        }
        
        let asyncFn = q.async(testGenerator);
        asyncFn().then(function(result) {
            assert.equal(result, 30);
            done();
        }).catch(done);
    });

    })