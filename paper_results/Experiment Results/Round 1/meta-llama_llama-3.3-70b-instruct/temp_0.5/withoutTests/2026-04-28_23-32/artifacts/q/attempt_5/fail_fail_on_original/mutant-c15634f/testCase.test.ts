import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should log a deprecation warning when called", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "newFunction");
        expect(() => {
            deprecatedFunction();
        }).not.toThrow();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
    });
});