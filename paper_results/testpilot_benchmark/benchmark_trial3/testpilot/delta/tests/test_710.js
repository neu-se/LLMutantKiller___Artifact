let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - priority parameter', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'test' }
        ]);
        
        // Without priority (default false), position at insertion point moves after insert
        assert.equal(delta.transformPosition(5, false), 9);
        
        // With priority true, position at insertion point stays before insert
        assert.equal(delta.transformPosition(5, true), 5);
        
        done();
    });

    })