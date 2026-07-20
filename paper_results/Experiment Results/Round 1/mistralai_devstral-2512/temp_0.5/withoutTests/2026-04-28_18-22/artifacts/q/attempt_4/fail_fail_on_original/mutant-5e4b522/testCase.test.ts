// Test case to detect the mutation in q.js
const fs = require('fs');
const path = require('path');

describe("Q library initialization", () => {
    it("should properly initialize Q in a browser-like environment", () => {
        // Read the q.js file content
        const qFilePath = path.join(__dirname, '../../q.js');
        const qCode = fs.readFileSync(qFilePath, 'utf8');

        // Create a mock browser-like environment
        const globalObj = {
            window: {},
            self: {}
        };

        // Execute the Q library code in this environment
        const vm = require('vm');
        const context = {
            module: { exports: {} },
            exports: {},
            window: globalObj.window,
            self: globalObj.self,
            console: console
        };

        vm.runInNewContext(qCode, context);

        // Verify that Q was properly initialized in the global scope
        expect((context as any).Q).toBeDefined();
        expect(typeof (context as any).Q).toBe("function");
        expect((context as any).Q.noConflict).toBeDefined();
        expect(typeof (context as any).Q.noConflict).toBe("function");
    });
});