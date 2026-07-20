// Test to detect the mutation in q.js
const vm = require('vm');
const fs = require('fs');
const path = require('path');

describe("Q module export condition", () => {
    it("should require exports to be an object in CommonJS environment", () => {
        const qCode = fs.readFileSync(path.resolve("../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

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

        // With original code, Q should NOT be exported when exports is not an object
        // With mutated code, Q WILL be exported (incorrectly)
        if (sandbox.module.exports) {
            // This means the mutation is present (condition was too permissive)
            fail("Q was exported when exports was not an object - mutation detected");
        }

        // Verify the condition in the code
        if (qCode.includes('typeof exports === "object"')) {
            // Original code - correct behavior
            expect(sandbox.module.exports).toBeUndefined();
        } else if (qCode.includes('true && typeof module === "object"')) {
            // Mutated code - should have failed above
            fail("Mutation detected: condition is too permissive");
        }
    });
});