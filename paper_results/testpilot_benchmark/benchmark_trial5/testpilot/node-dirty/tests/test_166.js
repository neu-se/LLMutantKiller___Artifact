let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - multiple once listeners', function(done) {
        let db = dirty();
        let results = [];
        
        // Add multiple prependOnceListeners
        db.prependOnceListener('multi-test', function() {
            results.push('first');
        });
        
        db.prependOnceListener('multi-test', function() {
            results.push('second');
        });
        
        db.prependOnceListener('multi-test', function() {
            results.push('third');
            
            // Verify all listeners were called in reverse order (last prepended executes first)
            assert.deepStrictEqual(results, ['third', 'second', 'first']);
            
            // Emit again to verify none are called again
            results.length = 0;
            db.em})    })
})