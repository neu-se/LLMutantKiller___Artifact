let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should return empty array initially', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        let reasons = q.getUnhandledReasons();
        assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
        assert.equal(reasons.length, 0, 'should initially have no unhandled reasons');
        done();
    });

    })