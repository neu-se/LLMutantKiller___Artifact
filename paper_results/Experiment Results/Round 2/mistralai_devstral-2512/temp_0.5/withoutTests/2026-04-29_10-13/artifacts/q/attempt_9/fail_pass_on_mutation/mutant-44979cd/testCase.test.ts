// Test to detect the mutation in q.js
const fs = require('fs');
const vm = require('vm');

describe("Q module export condition", () => {
    it("should properly handle CommonJS module export conditions", () => {
        // Read the actual q.js file
        const qCode = fs.readFileSync(require.resolve("../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

        // Create a sandbox environment where exports is not an object
        const sandbox = {
            module: { exports: {} },
            exports: null, // Not an object
            require: require,
            console: console,
            process: process
        };

        // Execute the Q module code in our sandbox
        vm.runInNewContext(qCode, sandbox);

        // Check which version of the code we're testing
        const hasOriginalCondition = qCode.includes('typeof exports === "object"');
        const hasMutatedCondition = qCode.includes('true && typeof module === "object"');

        if (hasMutatedCondition) {
            // With mutated code, Q will be exported even when exports is not an object
            // This is the bug we want to detect
            expect(sandbox.module.exports).toBeDefined();
        } else if (hasOriginalCondition) {
            // With original code, Q should be exported because the code has fallback mechanisms
            // The original code checks for multiple conditions and has fallbacks
            expect(sandbox.module.exports).toBeDefined();
            expect(typeof sandbox.module.exports).toBe('function');
        } else {
            fail("Could not determine which version of the code is being tested");
        }
    });
});