// test/console-log-test.js

const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('console.log output test', function() {
    it('should verify console.log output when module is run directly', function() {
        // Capture console.log output
        const originalLog = console.log;
        let logOutput = '';
        console.log = (msg) => { logOutput = msg; };

        // Simulate running the module directly by executing it in a child process
        const { execSync } = require('child_process');
        const path = require('path');
        const modulePath = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
        const output = execSync(`node ${modulePath}`, { encoding: 'utf8' }).trim();

        // Restore console.log
        console.log = originalLog;

        // Verify the output matches the original behavior
        expect(output).toBe("for testing purpose");
        expect(output).not.toBe("");
    });
});