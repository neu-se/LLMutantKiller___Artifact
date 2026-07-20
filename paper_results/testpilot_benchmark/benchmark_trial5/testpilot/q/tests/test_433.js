let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that yields rejected promise', function(done) {
        function* rejectedPromiseGenerator() {
            yield q.resolve(1);
            yield q.reject(new Error('Rejected promise'));
            return 'should not reach here';
        }
        
        // Manual spawn implementation
        function spawn(generatorFunction) {
            return q.Promise(function(resolve, reject) {
                const generator = generatorFunction();
                
                function step(value) {
                    try {
                        const result = generator.next(value);
                        if (result.done) {
                            resolve(result.value);
                        } else {
                            q.when(result.value)
                                .then(step)
                                .catch(function(error) {
                                    try {
                                        const throwResult = generator.throw(error);
                                        if (throwResult.done) {
                                            resolve(throwResult.value);
                                        } else {
                                            q.when(throwResult.value).then(step).catch(reject);
                                        }
                                    } catch (e) {
                                        reject(e);
                                    }
                                });
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
                
                step();
            });
        }
        
        spawn(rejectedPromiseGenerator)
            .then(function() {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Rejected promise');
                done();
            });
    });
});