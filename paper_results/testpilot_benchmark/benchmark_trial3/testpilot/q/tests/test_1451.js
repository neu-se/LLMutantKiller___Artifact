let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - can be called multiple times safely', function(done) {
        // Call stopUnhandledRejectionTracking multiple times
        q.stopUnhandledRejectionTracking();
        q.stopUnhandledRejectionTracking();
        q.stopUnhandledRejectionTracking();
        
        // Should not throw any errors
        done();
    });
});