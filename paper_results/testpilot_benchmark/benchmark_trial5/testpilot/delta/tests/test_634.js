let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine', function(done) {
        // Test 1: Basic functionality with multiple lines
        const delta1 = new quill_delta().insert('Hello\n\n')
                                       .insert('World')
                                       .insert({ image: 'octocat.png' })
                                       .insert('\n', { align: 'right' })
                                       .insert('!');
        
        const results1 = [];
        delta1.eachLine((line, attributes, i) => {
            results1.push({ line: line.ops, attributes, index: i });
        });
        
        assert.equal(results1.length, 4);
        assert.deepEqual(results1[0], { line: [{ insert: 'Hello' }], attributes: {}, index: 0 });
        assert.deepEqual(results1[1], { line: [], attributes: {}, index: 1 });
        assert.deepEqual(results1[2], { line: [{ insert: 'World' }, { insert: { image: 'octocat.png' } }], attributes: { align: 'right' }, index: 2 });
        assert.deepEqual(results1[3], { line: [{ insert: '!' }], attributes: {}, index: 3 });
        
        // Test 2: Single line without newline
        const delta2 = new quill_delta().insert('Single line');
        const results2 = [];
        delta2.eachLine((line, attributes, i) => {
            results2.push({ line: line.ops, attributes, index: i });
        });
        
        assert.equal(results2.length, 1);
        assert.deepEqual(results2[0], { line: [{ insert: 'Single line' }], attributes: {}, index: 0 });
        
        // Test 3: Empty delta
        const delta3 = new quill_delta();
        const results3 = [];
        delta3.eachLine((line, attributes, i) => {
            results3.push({ line: line.ops, attributes, index: i });
        });
        
        assert.equal(results3.length, 0);
        
        // Test 4: Early exit with false return
        const delta4 = new quill_delta().insert('Line 1\nLine 2\nLine 3\n');
        const results4 = [];
        delta4.eachLine((line, attributes, i) => {
            results4.push({ line: line.ops, attributes, index: i });
            if (i === 1) return false; // Exit early
        });
        
        assert.equal(results4.length, 2);
        assert.deepEqual(results4[0], { line: [{ insert: 'Line 1' }], attributes: {}, index: 0 });
        assert.deepEqual(results4[1], { line: [{ insert: 'Line 2' }], attributes: {}, index: 1 });
        
        // Test 5: Custom newline character
        const delta5 = new quill_delta().insert('Hello|World|Test');
        const results5 = [];
        delta5.eachLine((line, attributes, i) => {
            results5.push({ line: line.ops, attributes, index: i });
        }, '|');
        
        assert.equal(results5.length, 3);
        assert.deepEqual(results5[0], { line: [{ insert: 'Hello' }], attributes: {}, index: 0 });
        assert.deepEqual(results5[1], { line: [{ insert: 'World' }], attributes: {}, index: 1 });
        assert.deepEqual(results5[2], { line: [{ insert: 'Test' }], attributes: {}, index: 2 });
        
        // Test 6: Line with only newline character
        const delta6 = new quill_delta().insert('\n');
        const results6 = [];
        delta6.eachLine((line, attributes, i) => {
            results6.push({ line: line.ops, attributes, index: i });
        });
        
        assert.equal(results6.length, 1);
        assert.deepEqual(results6[0], { line: [], attributes: {}, index: 0 });
        
        // Test 7: Mixed content with embeds and formatting
        const delta7 = new quill_delta().insert('Bold', { bold: true })
                                       .insert('\n')
                                       .insert({ video: 'video.mp4' })
                                       .insert('\n', { align: 'center' });
        const results7 = [];
        delta7.eachLine((line, attributes, i) => {
            results7.push({ line: line.ops, attributes, index: i });
        });
        
        assert.equal(results7.length, 2);
        assert.deepEqual(results7[0], { line: [{ insert: 'Bold', attributes: { bold: true } }], attributes: {}, index: 0 });
        assert.deepEqual(results7[1], { line: [{ insert: { video: 'video.mp4' } }], attributes: { align: 'center' }, index: 1 });
        
        done();
    });
});