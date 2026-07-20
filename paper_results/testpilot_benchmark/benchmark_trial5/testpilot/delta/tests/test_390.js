let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - filter string inserts', function(done) {
        const delta = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
            .insert('World!');
        
        const filtered = delta.filter((op) => typeof op.insert === 'string');
        
        assert.equal(filtered.length, 2);
        assert.equal(filtered[0].insert, 'Hello');
        assert.deepEqual(filtered[0].attributes, { bold: true });
        assert.equal(filtered[1].insert, 'World!');
        done();
    });

    