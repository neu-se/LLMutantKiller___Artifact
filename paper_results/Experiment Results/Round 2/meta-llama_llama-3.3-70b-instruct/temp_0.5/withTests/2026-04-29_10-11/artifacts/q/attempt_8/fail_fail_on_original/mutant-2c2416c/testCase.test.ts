import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q deprecate function", () => {
    it("should log a deprecation warning with the correct message when the deprecated function is called", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = Q.deprecate(function () {}, "test", "alternative");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("test is deprecated, use alternative"));
    });
});