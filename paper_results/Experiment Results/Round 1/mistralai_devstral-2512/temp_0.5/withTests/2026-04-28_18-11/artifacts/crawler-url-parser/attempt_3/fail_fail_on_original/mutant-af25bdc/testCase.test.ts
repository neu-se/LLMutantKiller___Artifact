// test/console-log-test.js

const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('console.log output test', function() {
    it('should verify console.log output when module is run directly', function() {
        // Capture console.log output
        const originalLog = console.log;
        let logOutput = '';
        console.log = (msg) => { logOutput = msg; };

        // Simulate running the module directly by setting module.parent to null
        const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
        delete require.cache[modulePath];
        const Module = require('module');
        const originalParent = Module._cache[modulePath]?.parent;
        Module._cache[modulePath] = {
            ...require.cache[modulePath],
            parent: null
        };
        require(modulePath);

        // Restore console.log
        console.log = originalLog;

        // Verify the output matches the original behavior
        expect(logOutput).toBe("for testing purpose");
    });
});