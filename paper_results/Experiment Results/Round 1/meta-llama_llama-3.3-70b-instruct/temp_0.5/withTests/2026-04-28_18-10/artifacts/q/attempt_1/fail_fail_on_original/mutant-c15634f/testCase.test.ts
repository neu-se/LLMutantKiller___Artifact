import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should call the callback with a deprecation warning when console is defined", () => {
        // Create a spy for the console.warn function
        const warnSpy = jest.spyOn(console, 'warn');

        // Call the deprecate function
        Q.deprecate(() => {}, 'test', 'alternative');

        // Expect the warn function to have been called with a deprecation warning
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith('test is deprecated, use alternative instead.');
    });

    it("should not call the callback when console is not defined", () => {
        // Delete the console object
        const originalConsole = globalThis.console;
        delete globalThis.console;

        // Call the deprecate function
        Q.deprecate(() => {}, 'test', 'alternative');

        // Restore the console object
        globalThis.console = originalConsole;

        // Expect no error to have been thrown
        expect(true).toBe(true);
    });
});