describe("deprecate function", () => {
    it.skip("should check the condition in deprecate function", () => {
        const deprecate = (callback: Function, name: string, alternative: string) => {
            if (typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };

        const callback = jest.fn();
        deprecate(callback, 'test', 'alternative')();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not check the condition in deprecate function when condition is always true", () => {
        const deprecate = (callback: Function, name: string, alternative: string) => {
            if (true) {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
            }
            return callback();
        };

        const callback = jest.fn();
        expect(() => deprecate(callback, 'test', 'alternative')()).toThrowError();
    });
});