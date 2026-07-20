let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - with arguments', function(done) {
        let db = dirty();
        
        let listener = function(arg1, arg2, arg3) {
            assert.strictEqual(arg1, 'hello');
            assert.strictEqual(arg2, 42);
            assert.deepStrictEqual(arg3, { test: true });
            done();
        };
        
        db.prependOnceListener('args-test', listener);
        db.em    })
})