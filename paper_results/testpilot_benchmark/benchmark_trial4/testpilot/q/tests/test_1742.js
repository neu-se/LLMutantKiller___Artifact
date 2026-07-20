let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete with object that supports delete dispatch', function(done) {
        // Create a mock object that implements the delete dispatch method
        let mockObject = {
            data: { key1: 'value1', key2: 'value2' },
            dispatch: function(method, args) {
                if (method === 'delete') {
                    let key = args[0];
                    let existed = key in this.data;
                    delete this.data[key];
                    return q.resolve(existed);
                }
                return q.reject(new Error('Unsupported method'));
            }
        };

        q.delete(mockObject, 'key1')
            .then(function(result) {
                assert.strictEqual(result, true);
                assert.strictEqual('key1' in mockObject.data, false);
                assert.strictEqual(mockObject.data.key2, 'value2');
                done();
            })
            .catch(done);
    });
});