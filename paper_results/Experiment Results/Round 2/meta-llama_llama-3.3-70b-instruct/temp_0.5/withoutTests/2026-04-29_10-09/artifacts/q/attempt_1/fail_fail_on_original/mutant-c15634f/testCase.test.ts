import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should print a deprecation warning to the console", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const callback = jest.fn();
        const deprecatedFunction = deprecate(callback, "testFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
    });
});