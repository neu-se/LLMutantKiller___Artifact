import { deprecate } from '../../../../../../../../../../../subject_repositories/q/q.js';

describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = deprecate(function () {}, "testFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
    });
});