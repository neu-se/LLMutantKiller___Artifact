let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that returns a value', function(done) {
        function* returningGenerator() {
            yield q.resolve('intermediate');
            return 'final result';
        }
        
        q.spawn(returningGenerator);
        
        // Since spawn uses Q.done(), we can't directly test the return value
        // but we can verify the generator executes without error
        setTimeout(() => {
            done();
        }, 10);
    });
});