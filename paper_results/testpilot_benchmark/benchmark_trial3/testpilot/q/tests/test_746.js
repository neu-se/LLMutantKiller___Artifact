let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method with no arguments', function(done) {
        let testObj = {
            getValue: function() {
                return 42;
            }
        };
        
        // Use q.ninvoke to call a method on an object
        q.ninvoke(testObj, 'getValue')
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});