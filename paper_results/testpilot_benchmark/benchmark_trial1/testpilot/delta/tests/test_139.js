let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce - calculate total length', function(done) {
        const delta = new quill_delta().insert('Hello', { bold: true })
                                       .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
                                       .insert('World!');
        
        const length = delta.reduce((length, op) => {
            return length + (op.insert.length || 1);
        }, 0);
        
        assert.strictEqual(length, 12); // 'Hello' (5) + image (1) + 'World!' (6) = 12
        done();
    });

    