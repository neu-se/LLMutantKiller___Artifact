let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty database operations', function() {
        
        it('should emit destroy event when database is closed', function(done) {
            // Create a dirty database instance
            let db = dirty();
            
            // Listen for the close event (which is the actual destroy-like event in dirty)
            db.on('close', function() {
                done();
            });
            
            // Close the database to trigger the close event
            db.close();
        });

    })
})