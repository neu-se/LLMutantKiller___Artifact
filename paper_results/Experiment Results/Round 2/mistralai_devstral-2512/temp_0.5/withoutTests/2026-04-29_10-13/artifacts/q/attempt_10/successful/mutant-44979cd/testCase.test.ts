// Test to detect the mutation in q.js
const fs = require('fs');
const vm = require('vm');

describe("Q module export condition", () => {
    it("should detect when exports check is bypassed", () => {
        // Read the actual q.js file
        const qCode = fs.readFileSync(require.resolve("../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

        // Create a sandbox environment where exports is not an object
        const sandbox = {
            module: { exports: {} },
            exports: null, // Not an object
            require: require,
            console: console,
            process: process,
            __filename: "/test/q.js",
            __dirname: "/test"
        };

        // Track if the CommonJS export path was taken
        let exportPathTaken = false;
        const originalModuleExports = sandbox.module.exports;

        // Execute the Q module code in our sandbox
        vm.runInNewContext(`
            (function() {
                var originalModuleExports = module.exports;
                Object.defineProperty(module, 'exports', {
                    get: function() {
                        exportPathTaken = true;
                        return originalModuleExports;
                    },
                    set: function(value) {
                        exportPathTaken = true;
                        originalModuleExports = value;
                    },
                    configurable: true
                });
                ${qCode}
            })();
        `, sandbox);

        // Check which version of the code we're testing
        const hasOriginalCondition = qCode.includes('typeof exports === "object"');
        const hasMutatedCondition = qCode.includes('true && typeof module === "object"');

        if (hasMutatedCondition) {
            // With mutated code, the export path should be taken even when exports is not an object
            expect(exportPathTaken).toBe(true);
            fail("Mutation detected: Export path was taken when exports was not an object");
        } else if (hasOriginalCondition) {
            // With original code, the export path should NOT be taken when exports is not an object
            expect(exportPathTaken).toBe(false);
        } else {
            fail("Could not determine which version of the code is being tested");
        }
    });
});