let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - with arguments', function(done) {
        let db = dirty();
        
        db.prependOnceListener('args-test', function(arg1, arg2, arg3) {
            assert.strictEqual(arg1, 'hello');
            assert.strictEqual(arg2, 42);
            assert.deepStrictEqual(arg3, { key: 'value' });
            done();
        });
        
        db.em    })
})