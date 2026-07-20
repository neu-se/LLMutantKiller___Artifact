let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should work with complex objects', function(done) {
            let originalObject = { name: 'test', value: 123 };
            let receivedObject = null;
            
            q.resolve(originalObject)
                .tap(function(obj) {
                    receivedObject = obj;
                    obj.modified = true; // Modify the object in callback
                })
                .then(function(result) {
                    assert.strictEqual(result, originalObject, 'Same object reference should be returned');
                    assert.strictEqual(result.modified, true, 'Object modifications should persist');
                    assert.strictEqual(receivedObject, originalObject, 'Callback should receive same object');
                    done();
                })
                .catch(done);
        });
    });
});