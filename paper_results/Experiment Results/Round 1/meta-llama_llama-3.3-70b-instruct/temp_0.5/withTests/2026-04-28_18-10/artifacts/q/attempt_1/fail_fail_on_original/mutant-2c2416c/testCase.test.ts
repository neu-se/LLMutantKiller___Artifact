import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = Q.deprecate(() => {}, "deprecatedFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("deprecatedFunction is deprecated, use newFunction");
    });
});