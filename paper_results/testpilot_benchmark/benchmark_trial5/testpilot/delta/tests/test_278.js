let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert with embed object', function(done) {
        let delta = new quill_delta();
        let embed = { image: 'https://example.com/image.png' };
        let result = delta.insert(embed);
        
        assert.strictEqual(result.ops.length, 1);
        assert.deepStrictEqual(result.ops[0].insert, embed);
        assert.strictEqual(result.ops[0].attributes, undefined);
        done();
    });

    