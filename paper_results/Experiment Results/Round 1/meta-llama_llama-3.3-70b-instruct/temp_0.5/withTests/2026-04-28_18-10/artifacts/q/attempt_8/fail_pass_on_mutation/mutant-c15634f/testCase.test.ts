describe("deprecate function", () => {
    it("should throw an error when condition is always true", () => {
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

    it.skip("should not throw an error when condition is false", () => {
        const originalConsole = globalThis.console;
        // @ts-ignore
        globalThis.console = undefined;

        const callback = jest.fn();
        const deprecate = (callback: Function, name: string, alternative: string) => {
            if (false) {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };
        expect(() => deprecate(callback, 'test', 'alternative')()).not.toThrowError();

        globalThis.console = originalConsole;
    });
});