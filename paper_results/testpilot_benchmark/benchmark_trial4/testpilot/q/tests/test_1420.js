let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections works with empty state', function(done) {
        // Reset when there are no unhandled rejections
        q.resetUnhandledRejections();
        
        // Should not throw any errors
        done();
    });

    })