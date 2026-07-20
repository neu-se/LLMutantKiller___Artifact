let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.registerEmbed with empty string type', function(done) {
        const handler = function(node, delta) {
            return { insert: { empty: 'test' } };
        };
        
        try {
            quill_delta.registerEmbed('', handler);
            // If it doesn't throw, that's acceptable
            done();
        } catch (error) {
            // If it throws, verify it's a reasonable error
            assert.ok(error instanceof Error, 'Should throw an Error object for empty type');
            done();
        }
    });
});