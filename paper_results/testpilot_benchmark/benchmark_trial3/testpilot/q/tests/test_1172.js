let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify returns a function', function() {
        // Test that q.denodeify returns a function
        // q.denodeify is used to convert Node.js-style callback functions to promise-returning functions
        const fs = require('fs');
        const denodeified = q.denodeify(fs.readFile);
        assert.strictEqual(typeof denodeified, 'function');
    });
});