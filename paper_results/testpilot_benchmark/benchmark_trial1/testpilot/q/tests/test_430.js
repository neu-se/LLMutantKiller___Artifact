let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with promise-yielding generator', function(done) {
        function* promiseGenerator() {
            let result1 = yield q.resolve(10);
            let result2 = yield q.resolve(20);
            return result1 + result2;
        }
        
        // Manual implementation of generator execution with promises
        function runGenerator(generator) {
            let gen = generator();
            
            function handle(result) {
                if (!result.done) {
                    return q.when(result.value)
                        .then(function(res) {
                            return handle(gen.next(res));
                        })
                        .catch(function(err) {
                            return handle(gen.throw(err));
                        });
                }
                return result.value;
            }
            
            try {
                return handle(gen.next());
            } catch (ex) {
                return q.reject(ex);
            }
        }
        
        runGenerator(promiseGenerator)
            .then(function(result) {
                assert.equal(result, 30);
                done();
            })
            .catch(done);
    });
});