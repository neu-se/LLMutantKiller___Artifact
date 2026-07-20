import { deprecate } from "../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should log a deprecation warning when the deprecated function is called", () => {
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();

        const alternativeFunction = () => {};
        const testDeprecation = deprecate(alternativeFunction, "testDeprecation", "alternativeFunction");

        testDeprecation();

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("testDeprecation is deprecated"));

        console.warn = originalConsoleWarn;
    });
});