import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function console check", () => {
    it("should check console availability before warning", () => {
        const originalConsole = global.console;
        // Simulate console being undefined
        global.console = undefined;

        let warningCalled = false;
        const originalWarn = console?.warn;
        if (console) {
            console.warn = () => { warningCalled = true; };
        }

        const testFn = () => "test";
        const deprecatedFn = Q.deprecate(testFn, "testFn", "newFn");

        // Call the deprecated function
        const result = deprecatedFn();

        // Restore console
        global.console = originalConsole;
        if (console && originalWarn) {
            console.warn = originalWarn;
        }

        // In the original code, warning should not be called when console is undefined
        // In the mutated code, it would try to call warn on undefined
        expect(result).toBe("test");
        expect(warningCalled).toBe(false);
    });
});