let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method with no arguments', function(done) {
        let mockObject = {
            getValue: function() {
                return 42;
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.post('getValue', [])
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});