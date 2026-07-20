let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test'); // Should not trigger again
        
        setTimeout(function() {
            assert.equal(callCount, 1);
            done();
        }, 10);
    });