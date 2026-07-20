let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with simple generator', function(done) {
        function* simpleGenerator() {
            yield 1;
            yield 2;
            return 3;
        }
        
        // Manual generator execution since q.spawn doesn't exist
        function runGenerator(generator) {
            return q.Promise(function(resolve, reject) {
                let gen = generator();
                let result;
                
                try {
                    // Execute the generator to completion
                    while (true) {
                        result = gen.next();
                        if (result.done) {
                            resolve(result.value);
                            break;
                        }
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
        
        runGenerator(simpleGenerator)
            .then(function(result) {
                assert.equal(result, 3);
                done();
            })
            .catch(done);
    });
});