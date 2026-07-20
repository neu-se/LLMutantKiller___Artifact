let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that handles rejected promises', function(done) {
        function* testGenerator() {
            try {
                yield q.reject(new Error('test error'));
            } catch (error) {
                return 'caught: ' + error.message;
            }
        }
        
        let asyncFn = q.async(testGenerator);
        asyncFn().then(function(result) {
            assert.equal(result, 'caught: test error');
            done();
        }).catch(done);
    });

    })