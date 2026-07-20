let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections works with no prior rejections', function(done) {
        // Call reset when there are no unhandled rejections
        q.resetUnhandledRejections();
        
        // Should not throw any errors
        done();
    });

    })