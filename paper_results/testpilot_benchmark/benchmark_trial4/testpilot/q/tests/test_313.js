let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with different string values', function(done) {
        q.join('hello', 'world').then(function(result) {
            done(new Error('Expected rejection but got fulfillment'));
        }).catch(function(error) {
            // Expected rejection
            done();
        });
    });
});