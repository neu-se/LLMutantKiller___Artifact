let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with simple promise', function(done) {
        let testObject = {
            getValue: function() { return 'test value'; },
            data: 'some data'
        };
        
        // Test basic promise functionality instead of non-existent q.master
        let promise = q.resolve(testObject.getValue());
        
        promise.then(function(result) {
            assert.strictEqual(result, 'test value', 'should resolve promise correctly');
            done();
        }).catch(done);
    });
});