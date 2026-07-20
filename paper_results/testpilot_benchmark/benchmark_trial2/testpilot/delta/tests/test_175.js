let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with single line', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello World' }
        ]);
        
        let lines = [];
        let attributes = [];
        let indices = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line);
            attributes.push(attrs);
            indices.push(i);
        });
        
        assert.equal(lines.length, 1);
        assert.equal(lines[0].ops[0].insert, 'Hello World');
        assert.deepEqual(attributes[0], {});
        assert.equal(indices[0], 0);
        done();
    });

    })