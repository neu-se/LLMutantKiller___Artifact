let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - object property setting', function(done) {
        let obj = { name: 'original' };
        let promise = q.fulfill(obj);
        
        promise.then(function(resolvedObj) {
            resolvedObj.name = 'modified';
            return resolvedObj;
        }).then(function(result) {
            assert.strictEqual(result.name, 'modified');
            assert.strictEqual(obj.name, 'modified');
            done();
        }).catch(done);
    });
});