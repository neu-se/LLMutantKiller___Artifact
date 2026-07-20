let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - without callback', function(done) {
        let db = dirty();
        
        db.set('noCallbackKey', { count: 5 });
        
        // Should work without callback
        db.update('noCallbackKey', function(doc) {
            doc.count *= 2;
            return doc;
        });
        
        // Give it a moment to process, then check
        setTimeout(function() {
            let retrieved = db.get('noCallbackKey');
            assert.strictEqual(retrieved.count, 10);
            done();
        }, 10);
    });
});