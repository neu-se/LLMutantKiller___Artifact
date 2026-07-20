let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - basic functionality', function(done) {
        const delta = new Delta()
            .insert('Hello\n\n')
            .insert('World')
            .insert({ image: 'octocat.png' })
            .insert('\n', { align: 'right' })
            .insert('!');

        const results = [];
        delta.eachLine((line, attributes, i) => {
            results.push({ line, attributes, index: i });
        });

        assert.equal(results.length, 4);
        
        // Line 0: "Hello"
        assert.deepEqual(results[0].line.ops, [{ insert: 'Hello' }]);
        assert.deepEqual(results[0].attributes, {});
        assert.equal(results[0].index, 0);
        
        // Line 1: empty line
        assert.deepEqual(results[1].line.ops, []);
        assert.deepEqual(results[1].attributes, {});
        assert.equal(results[1].index, 1);
        
        // Line 2: "World" + image with align attribute
        assert.deepEqual(results[2].line.ops, [
            { insert: 'World' }, 
            { insert: { image: 'octocat.png' } }
        ]);
        assert.deepEqual(results[2].attributes, { align: 'right' });
        assert.equal(results[2].index, 2);
        
        // Line 3: "!"
        assert.deepEqual(results[3].line.ops, [{ insert: '!' }]);
        assert.deepEqual(results[3].attributes, {});
        assert.equal(results[3].index, 3);
        
        done();
    });
});