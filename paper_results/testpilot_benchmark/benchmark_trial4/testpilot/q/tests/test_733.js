let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke preserves argument types', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedArgs = null;
        
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve('success');
        };
        
        // Test with various argument types
        let testObj = {test: true};
        let testArray = [1, 2, 3];
        let testFunc = function() { return 'test'; };
        
        mockPromise.invoke('testTypes', null, undefined, 0, '', false, testObj, testArray, testFunc);
        
        // Verify all argument types are preserved
        assert.equal(capturedArgs[0], 'testTypes');
        let passedArgs = capturedArgs[1];
        assert.strictEqual(passedArgs[0], null);
        assert.strictEqual(passedArgs[1], undefined);
        assert.strictEqual(passedArgs[2], 0);
        assert.strictEqual(passedArgs[3], '');
        assert.strictEqual(passedArgs[4], false);
        assert.strictEqual(passedArgs[5], testObj);
        assert.strictEqual(passedArgs[6], testArray);
        assert.strictEqual(passedArgs[7], testFunc);
        
        done();
    });
});