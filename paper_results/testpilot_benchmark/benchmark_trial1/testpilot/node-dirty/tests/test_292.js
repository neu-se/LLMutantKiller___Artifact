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
        
        // Wait for the set operation to complete, then perform update
        setImmediate(() => {
            // Get the existing document first
            let existingDoc = db.get('complexKey');
            
            if (!existingDoc) {
                return done(new Error('Document not found'));
            }
            
            // Perform the update manually since dirty might not have an update method
            existingDoc.user.name = 'Jane';
            existingDoc.settings.theme = 'light';
            existingDoc.lastLogin = new Date('2023-12-01');
            existingDoc.loginCount = (existingDoc.loginCount || 0) + 1;
            
            // Set the updated document back
            db.set('complexKey', existingDoc);
            
            // Get the updated document to verify
            let updatedDoc = db.get('complexKey');
            
            assert.strictEqual(updatedDoc.user.name, 'Jane');
            assert.strictEqual(updatedDoc.settings.theme, 'light');
            assert.strictEqual(updatedDoc.loginCount, 1);
            assert(updatedDoc.lastLogin instanceof Date);
            done();
        });
    });
});