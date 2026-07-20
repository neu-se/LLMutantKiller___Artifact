let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with successful generator', function(done) {
        let executionOrder = [];
        
        function* testGenerator() {
            executionOrder.push('start');
            let result = yield q.resolve(42);
            executionOrder.push('middle');
            assert.equal(result, 42);
            let result2 = yield q.resolve('hello');
            executionOrder.push('end');
            assert.equal(result2, 'hello');
            return 'completed';
        }
        
        q.spawn(testGenerator);
        
        // Give the async operation time to complete
        setTimeout(() => {
            assert.deepEqual(executionOrder, ['start', 'middle', 'end']);
            done();
        }, 10);
    });
});