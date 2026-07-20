let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with empty delta', function(done) {
        let delta = new quill_delta();
        
        let result = delta.reduce((acc, op) => {
            return acc + 1;
        }, 0);
        
        assert.strictEqual(result, 0);
        done();
    });

    })