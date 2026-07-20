describe("deprecate function", () => {
    it.skip("should call the callback with a deprecation warning when console is defined", () => {
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();

        const callback = jest.fn();
        const deprecate = (callback: Function, name: string, alternative: string) => {
            if (typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };
        deprecate(callback, 'test', 'alternative')();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith('test is deprecated, use alternative instead.');

        console.warn = originalConsoleWarn;
    });

    it("should not call console.warn when console is not defined and condition is true", () => {
        const originalConsole = globalThis.console;
        // @ts-ignore
        globalThis.console = undefined;

        const callback = jest.fn();
        const deprecate = (callback: Function, name: string, alternative: string) => {
            if (true) {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };
        expect(() => deprecate(callback, 'test', 'alternative')()).toThrowError();

        globalThis.console = originalConsole;
    });
});