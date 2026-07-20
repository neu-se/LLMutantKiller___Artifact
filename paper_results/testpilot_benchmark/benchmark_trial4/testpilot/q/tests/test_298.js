let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with different primitive values', function(done) {
        q.join(5, 10).then(function(result) {
            done(new Error('Expected rejection but got fulfillment'));
        }).catch(function(error) {
            // Expected rejection
            done();
        });
    });

    })