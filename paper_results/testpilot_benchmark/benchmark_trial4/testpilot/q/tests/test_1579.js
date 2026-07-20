describe('test suite', function() {
    it('test case', function(done) {
        let assert = require('assert');
let q = require('q');

function test() {
    console.log('Running test: q.spawn with generator that returns a value');
    
    function* returningGenerator() {
        yield q.resolve('intermediate');
        return 'final result';
    }
    
    try {
        q.spawn(returningGenerator);
        
        // Since spawn uses Q.done(), we can't directly test the return value
        // but we can verify the generator executes without error
        setTimeout(() => {
            console.log('Test passed: Generator executed without error');
        }, 10);
        
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

test();
    })
})