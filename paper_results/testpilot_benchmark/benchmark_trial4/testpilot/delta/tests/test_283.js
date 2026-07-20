let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert with embed and attributes', function(done) {
        let delta = new quill_delta();
        let embed = { video: 'https://example.com/video.mp4' };
        let attributes = { width: '100%', height: '400px' };
        let result = delta.insert(embed, attributes);
        
        assert.strictEqual(result.ops.length, 1);
        assert.deepStrictEqual(result.ops[0].insert, embed);
        assert.deepStrictEqual(result.ops[0].attributes, attributes);
        done();
    });

    