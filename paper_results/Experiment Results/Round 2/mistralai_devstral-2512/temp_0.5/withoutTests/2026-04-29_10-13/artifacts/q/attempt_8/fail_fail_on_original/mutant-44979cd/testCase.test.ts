// Test to detect the mutation in q.js
const fs = require('fs');
const vm = require('vm');

describe("Q module export condition", () => {
    it("should require exports to be an object in CommonJS environment", () => {
        // Read the actual q.js file from the correct path
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
            expect(sandbox.module.exports).toBeDefined();
            fail("Mutation detected: Q was exported when exports was not an object");
        } else if (hasOriginalCondition) {
            // With original code, Q should NOT be exported when exports is not an object
            expect(sandbox.module.exports).toBeUndefined();
        } else {
            fail("Could not determine which version of the code is being tested");
        }
    });
});