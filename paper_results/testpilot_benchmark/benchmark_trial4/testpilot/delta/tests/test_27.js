let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should calculate change length', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },  // +5
            { delete: 3 },        // -3
            { retain: 2 }         // +0
        ]);
        assert.equal(delta.changeLength(), 2);
        done();
    });

    })