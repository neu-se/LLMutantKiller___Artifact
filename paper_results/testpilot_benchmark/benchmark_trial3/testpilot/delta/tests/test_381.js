let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter', function(done) {
        // Test 1: Filter string inserts from mixed operations
        const delta1 = new quill_delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
            .insert('World!');
        
        const textOps = delta1.filter((op) => typeof op.insert === 'string');
        assert.equal(textOps.length, 2);
        assert.equal(textOps[0].insert, 'Hello');
        assert.equal(textOps[1].insert, 'World!');
        
        // Test 2: Filter operations with specific attributes
        const delta2 = new quill_delta()
            .insert('Plain text')
            .insert('Bold text', { bold: true })
            .insert('Italic text', { italic: true })
            .insert('Bold and italic', { bold: true, italic: true });
        
        const boldOps = delta2.filter((op) => op.attributes && op.attributes.bold);
        assert.equal(boldOps.length, 2);
        assert.equal(boldOps[0].insert, 'Bold text');
        assert.equal(boldOps[1].insert, 'Bold and italic');
        
        // Test 3: Filter non-text operations (embeds)
        const delta3 = new quill_delta()
            .insert('Text before')
            .insert({ image: 'image1.png' })
            .insert({ video: 'video1.mp4' })
            .insert('Text after');
        
        const embedOps = delta3.filter((op) => typeof op.insert === 'object');
        assert.equal(embedOps.length, 2);
        assert.deepEqual(embedOps[0].insert, { image: 'image1.png' });
        assert.deepEqual(embedOps[1].insert, { video: 'video1.mp4' });
        
        // Test 4: Filter with no matches
        const delta4 = new quill_delta()
            .insert('Plain text')
            .insert('More text');
        
        const noMatches = delta4.filter((op) => op.attributes && op.attributes.underline);
        assert.equal(noMatches.length, 0);
        
        // Test 5: Filter empty delta
        const delta5 = new quill_delta();
        const emptyFilter = delta5.filter((op) => true);
        assert.equal(emptyFilter.length, 0);
        
        done();
    });
});