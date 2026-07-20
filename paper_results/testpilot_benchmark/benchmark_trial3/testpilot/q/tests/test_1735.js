let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete with non-existent key', function(done) {
        let mockObject = {
            data: { key1: 'value1' },
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

        mockObject.dispatch('delete', ['nonexistent'])
            .then(function(result) {
                assert.strictEqual(result, false);
                assert.strictEqual(mockObject.data.key1, 'value1');
                done();
            })
            .catch(done);
    });
});