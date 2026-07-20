let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - throws error for undefined callback', function() {
        assert.throws(() => {
            q.denodeify(undefined);
        }, /Q can't wrap an undefined function/);
    });
});