let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - inspect shows rejected state', function() {
        const reason = 'rejection reason';
        const rejectedPromise = q.Promise.reject(reason);
        
        const inspection = rejectedPromise.inspect();
        assert.strictEqual(inspection.state, 'rejected');
        assert.strictEqual(inspection.reason, reason);
    });
});