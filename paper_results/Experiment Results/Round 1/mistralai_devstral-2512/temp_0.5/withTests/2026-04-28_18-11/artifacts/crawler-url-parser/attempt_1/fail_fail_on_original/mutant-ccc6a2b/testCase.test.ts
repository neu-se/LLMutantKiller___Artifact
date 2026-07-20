// test/09_module-parent-test.js

const assert = require('assert');
const cup = require("../");

describe('module parent test', function() {
    it('should not have module parent block affecting behavior', function() {
        // This test verifies that the module behaves correctly when loaded as a dependency
        // The mutation removes the testing block, which should not affect normal operation
        let result = cup.parse("https://www.npmjs.com/package/electron-window-manager");
        assert.notEqual(result, null);
        assert.equal(result.protocol, "https:");
        assert.equal(result.host, "www.npmjs.com");
        assert.equal(result.path, "/package/electron-window-manager");
    });
});