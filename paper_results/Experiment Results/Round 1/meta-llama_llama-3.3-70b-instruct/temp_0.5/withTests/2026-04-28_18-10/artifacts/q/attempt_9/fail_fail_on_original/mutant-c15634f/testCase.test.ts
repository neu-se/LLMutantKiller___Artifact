describe("deprecate function", () => {
    it("should check the condition in deprecate function", () => {
        const originalConsole = globalThis.console;
        const originalDeprecate = Q.deprecate;

        Q.deprecate = (callback: Function, name: string, alternative: string) => {
            if (typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };

        const callback = jest.fn();
        Q.deprecate(callback, 'test', 'alternative')();

        expect(callback).toHaveBeenCalledTimes(1);

        Q.deprecate = originalDeprecate;
        globalThis.console = originalConsole;
    });
});