// test/console-log-test.js

const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('console.log output test', function() {
    it('should verify console.log output when module is run directly', function() {
        // Capture console.log output
        const originalLog = console.log;
        let logOutput = '';
        console.log = (msg) => { logOutput = msg; };

        // Simulate running the module directly by checking if module.parent is null
        const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
        delete require.cache[modulePath];

        // Mock module.parent to be null to trigger the console.log
        const Module = require('module');
        const originalParent = module.parent;
        module.parent = null;

        require(modulePath);

        // Restore module.parent
        module.parent = originalParent;

        // Restore console.log
        console.log = originalLog;

        // Verify the output matches the original behavior
        expect(logOutput).toBe("for testing purpose");
    });
});