let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - should work with complex object updates', function(done) {
        let db = dirty();
        
        let complexObj = {
            user: { id: 1, name: 'John' },
            settings: { theme: 'dark', notifications: true },
            lastLogin: new Date('2023-01-01')
        };
        
        db.set('complexKey', complexObj);
        
        db.update('complexKey', function(doc) {
            doc.user.name = 'Jane';
            doc.settings.theme = 'light';
            doc.lastLogin = new Date('2023-12-01');
            doc.loginCount = (doc.loginCount || 0) + 1;
            return doc;
        }, function(err, updatedDoc) {
            assert.ifError(err);
            assert.strictEqual(updatedDoc.user.name, 'Jane');
            assert.strictEqual(updatedDoc.settings.theme, 'light');
            assert.strictEqual(updatedDoc.loginCount, 1);
            assert(updatedDoc.lastLogin instanceof Date);
            done();
        });
    });
});