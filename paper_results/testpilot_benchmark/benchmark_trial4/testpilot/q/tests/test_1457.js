let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - can be called multiple times safely', function(done) {
        // Test that calling stopUnhandledRejectionTracking multiple times doesn't cause issues
        try {
            q.stopUnhandledRejectionTracking();
            q.stopUnhandledRejectionTracking();
            q.stopUnhandledRejectionTracking();
            done();
        } catch (error) {
            done(error);
        }
    });
});