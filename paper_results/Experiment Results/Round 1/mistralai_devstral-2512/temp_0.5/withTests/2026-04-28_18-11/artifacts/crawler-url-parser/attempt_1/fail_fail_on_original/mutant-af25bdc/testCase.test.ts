// test/console-log-test.js

const cup = require("../crawler-url-parser.js");

describe('console.log output test', function() {
    it('should verify console.log output when module is run directly', function() {
        // Capture console.log output
        const originalLog = console.log;
        let logOutput = '';
        console.log = (msg) => { logOutput = msg; };

        // Simulate running the module directly
        const modulePath = require.resolve('../crawler-url-parser.js');
        delete require.cache[modulePath];
        require(modulePath);

        // Restore console.log
        console.log = originalLog;

        // Verify the output matches the original behavior
        expect(logOutput).toBe("for testing purpose");
    });
});