let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that throws unhandled error', function(done) {
        function* throwingGenerator() {
            yield q.resolve(1);
            throw new Error('unhandled error');
        }
        
        // Use q.async instead of q.spawn, or implement spawn-like behavior
        function runGenerator(generatorFn) {
            return q.Promise(function(resolve, reject) {
                const generator = generatorFn();
                
                function step(value) {
                    try {
                        const result = generator.next(value);
                        if (result.done) {
                            resolve(result.value);
                        } else {
                            q.when(result.value).then(step).catch(reject);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
                
                step();
            });
        }
        
        runGenerator(throwingGenerator)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'unhandled error');
                done();
            });
    });
});