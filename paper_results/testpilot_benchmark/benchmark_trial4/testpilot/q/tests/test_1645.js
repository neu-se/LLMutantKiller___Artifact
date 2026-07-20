let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method call', function(done) {
        let testObject = {
            getValue: function() {
                return 42;
            },
            add: function(a, b) {
                return a + b;
            }
        };
        
        q.fcall(testObject.getValue.bind(testObject))
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});