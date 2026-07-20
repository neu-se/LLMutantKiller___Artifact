let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - empty delta', function(done) {
        let delta = new Delta();
        
        let lineCount = 0;
        delta.eachLine(() => {
            lineCount++;
        });
        
        assert.equal(lineCount, 0);
        done();
    });

    })