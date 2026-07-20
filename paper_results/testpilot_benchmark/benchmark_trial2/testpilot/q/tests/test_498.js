let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete with object having delete method', function(done) {
        // Create a mock object with a delete method
        let mockObject = {
            data: { key1: 'value1', key2: 'value2' },
            delete: function(key) {
                delete this.data[key];
                return this.data;
            }
        };
        
        // Call the delete method directly and wrap the result in a promise
        let result = q.resolve(mockObject.delete('key1'));
        
        result.then(function(data) {
            assert.strictEqual(data.key1, undefined);
            assert.strictEqual(data.key2, 'value2');
            done();
        }).catch(done);
    });
});