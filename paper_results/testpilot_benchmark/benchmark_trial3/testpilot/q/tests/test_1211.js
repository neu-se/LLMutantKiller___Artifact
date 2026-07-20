describe('test suite', function() {
    it('test case', function(done) {
        let assert = require('assert');
let q = require('q');

// Simple test runner
function runTest() {
    console.log('Running test: q.makePromise.prototype.npost - multiple arguments');
    
    let mockObject = {
        dispatch: function(method, args) {
            assert.equal(args[1].length, 4); // 3 original args + node resolver
            assert.equal(args[1][0], 'arg1');
            assert.equal(args[1][1], 'arg2');
            assert.equal(args[1][2], 'arg3');
            
            setTimeout(() => {
                args[1][3](null, 'multiple args result');
            }, 10);
            
            return q.resolve();
        }
    };
    
    let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1', 'arg2', 'arg3']);
    
    return promise.then(function(result) {
        assert.equal(result, 'multiple args result');
        console.log('Test passed!');
    }).catch(function(error) {
        console.error('Test failed:', error);
        throw error;
    });
}

// Run the test
runTest().then(() => {
    console.log('All tests completed successfully');
}).catch((error) => {
    console.error('Test suite failed:', error);
    process.exit(1);
});
    })
})