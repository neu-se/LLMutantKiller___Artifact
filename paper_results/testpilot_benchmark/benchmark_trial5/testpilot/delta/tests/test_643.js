let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with basic newlines', function(done) {
        const delta = new Delta()
            .insert('Hello\n\n')
            .insert('World')
            .insert({ image: 'octocat.png' })
            .insert('\n', { align: 'right' })
            .insert('!');
        
        const expectedLines = [
            { ops: [{ insert: 'Hello' }], attributes: {}, index: 0 },
            { ops: [], attributes: {}, index: 1 },
            { ops: [{ insert: 'World' }, { insert: { image: 'octocat.png' } }], attributes: { align: 'right' }, index: 2 },
            { ops: [{ insert: '!' }], attributes: {}, index: 3 }
        ];
        
        let lineIndex = 0;
        delta.eachLine((line, attributes, i) => {
            const expected = expectedLines[lineIndex];
            assert.deepEqual(line.ops, expected.ops, `Line ${i} ops should match`);
            assert.deepEqual(attributes, expected.attributes, `Line ${i} attributes should match`);
            assert.equal(i, expected.index, `Line ${i} index should match`);
            lineIndex++;
        });
        
        assert.equal(lineIndex, expectedLines.length, 'Should process all expected lines');
        done();
    });
});