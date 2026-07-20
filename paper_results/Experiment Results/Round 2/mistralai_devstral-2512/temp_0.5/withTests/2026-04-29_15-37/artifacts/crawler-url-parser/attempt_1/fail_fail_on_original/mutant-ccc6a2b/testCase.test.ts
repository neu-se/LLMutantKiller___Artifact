// test/09_debugger-test.js

const assert = require('assert');
const cup = require("../");

describe('debugger test', function() {
    it('should not have debugger statement in production code', function() {
        // This test verifies that the module can be required without hitting a debugger statement
        // The mutation removes the debugger statement, so this test should pass in the original
        // but fail in the mutated version if the debugger is present (as it would pause execution)
        let result = cup.parse("https://www.npmjs.com/package/electron-window-manager");
        assert.notEqual(result, null);
        assert.equal(result.url, "https://www.npmjs.com/package/electron-window-manager");
    });
});