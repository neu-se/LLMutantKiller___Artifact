import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should call the callback with a deprecation warning when console is defined", () => {
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();

        const callback = jest.fn();
        Q.deprecate(callback, 'test', 'alternative')();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith('test is deprecated, use alternative instead.');

        console.warn = originalConsoleWarn;
    });

    it("should not call console.warn when console is not defined", () => {
        const originalConsole = globalThis.console;
        // @ts-ignore
        globalThis.console = undefined;

        const callback = jest.fn();
        Q.deprecate(callback, 'test', 'alternative')();

        expect(callback).toHaveBeenCalledTimes(1);

        globalThis.console = originalConsole;
    });
});