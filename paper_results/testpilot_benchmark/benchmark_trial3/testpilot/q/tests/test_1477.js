let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - object property deletion', function(done) {
        let obj = { name: 'test', value: 123 };
        let promise = q.fulfill(obj);
        
        q.del(promise, 'name').then(function() {
            return q.get(promise, 'name');
        }).then(function(result) {
            assert.strictEqual(result, undefined);
            assert.strictEqual(obj.name, undefined);
            done();
        }).catch(done);
    });
});