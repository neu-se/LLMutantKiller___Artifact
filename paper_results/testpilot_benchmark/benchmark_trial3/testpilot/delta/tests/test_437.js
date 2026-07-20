let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition', function(done) {
        // Test 1: Partition based on string vs non-string inserts
        const delta1 = new quill_delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://octodex.github.com/images/labtocat.png' })
            .insert('World!');
        
        const results1 = delta1.partition((op) => typeof op.insert === 'string');
        const passed1 = results1[0];
        const failed1 = results1[1];
        
        assert.equal(passed1.length, 2);
        assert.equal(failed1.length, 1);
        assert.equal(passed1[0].insert, 'Hello');
        assert.deepEqual(passed1[0].attributes, { bold: true });
        assert.equal(passed1[1].insert, 'World!');
        assert.deepEqual(failed1[0].insert, { image: 'https://octodex.github.com/images/labtocat.png' });
        
        // Test 2: Partition based on presence of attributes
        const delta2 = new quill_delta()
            .insert('Plain text')
            .insert('Bold text', { bold: true })
            .insert('Italic text', { italic: true });
        
        const results2 = delta2.partition((op) => op.attributes && Object.keys(op.attributes).length > 0);
        const passed2 = results2[0];
        const failed2 = results2[1];
        
        assert.equal(passed2.length, 2);
        assert.equal(failed2.length, 1);
        assert.equal(passed2[0].insert, 'Bold text');
        assert.equal(passed2[1].insert, 'Italic text');
        assert.equal(failed2[0].insert, 'Plain text');
        
        // Test 3: Empty delta
        const delta3 = new quill_delta();
        const results3 = delta3.partition((op) => true);
        
        assert.equal(results3[0].length, 0);
        assert.equal(results3[1].length, 0);
        
        // Test 4: All operations pass predicate
        const delta4 = new quill_delta()
            .insert('Text1')
            .insert('Text2');
        
        const results4 = delta4.partition((op) => typeof op.insert === 'string');
        
        assert.equal(results4[0].length, 2);
        assert.equal(results4[1].length, 0);
        
        // Test 5: All operations fail predicate
        const delta5 = new quill_delta()
            .insert({ video: 'video.mp4' })
            .insert({ image: 'image.png' });
        
        const results5 = delta5.partition((op) => typeof op.insert === 'string');
        
        assert.equal(results5[0].length, 0);
        assert.equal(results5[1].length, 2);
        
        done();
    });
});