let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should be callable multiple times safely', function(done) {
        // Should not throw when called multiple times
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