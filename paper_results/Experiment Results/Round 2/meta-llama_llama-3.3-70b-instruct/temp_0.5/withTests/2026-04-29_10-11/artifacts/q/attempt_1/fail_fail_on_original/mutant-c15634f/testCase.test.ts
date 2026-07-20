import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.deprecate function", () => {
    it("should log a deprecation warning when the deprecated function is called", () => {
        const originalConsoleWarn = console.warn;
        const deprecationWarning = "testDeprecation is deprecated, use alternativeFunction instead.";
        console.warn = jest.fn();

        const alternativeFunction = () => {};
        const testDeprecation = Q.deprecate(alternativeFunction, "testDeprecation", "alternativeFunction");

        testDeprecation();

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(deprecationWarning);

        console.warn = originalConsoleWarn;
    });
});