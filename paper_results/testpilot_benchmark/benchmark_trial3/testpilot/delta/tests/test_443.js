let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition - string vs non-string inserts', function(done) {
        const delta = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
            .insert('World!');
        
        const results = delta.partition((op) => typeof op.insert === 'string');
        const passed = results[0];
        const failed = results[1];
        
        assert.equal(passed.length, 2);
        assert.equal(failed.length, 1);
        
        assert.equal(passed[0].insert, 'Hello');
        assert.deepEqual(passed[0].attributes, { bold: true });
        assert.equal(passed[1].insert, 'World!');
        
        assert.deepEqual(failed[0].insert, { image: 'https://octodex.github.com/images/labtocat.png' });
        
        done();
    });
    
    