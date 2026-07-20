let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with mock object', function(done) {
        // Create a mock object with the method we want to call
        let mockObject = {
            testMethod: function(arg1, arg2) {
                return q.resolve({ name: 'testMethod', args: [arg1, arg2] });
            }
        };
        
        q.post(mockObject, 'testMethod', ['arg1', 'arg2'])
            .then(function(result) {
                assert.equal(result.name, 'testMethod');
                assert.deepEqual(result.args, ['arg1', 'arg2']);
                done();
            })
            .catch(done);
    });
});