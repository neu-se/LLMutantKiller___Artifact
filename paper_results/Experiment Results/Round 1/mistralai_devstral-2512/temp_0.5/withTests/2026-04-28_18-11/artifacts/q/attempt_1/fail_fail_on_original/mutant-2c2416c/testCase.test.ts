import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should include the alternative message in the deprecation warning", () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const testFn = jest.fn().mockReturnValue("test result");
        const deprecatedFn = Q.deprecate(testFn, "testFunction", "use newFunction");

        const result = deprecatedFn();

        expect(result).toBe("test result");
        expect(consoleWarnSpy).toHaveBeenCalled();
        const warningMessage = consoleWarnSpy.mock.calls[0][0];
        expect(warningMessage).toContain("testFunction");
        expect(warningMessage).toContain("use newFunction");
        expect(warningMessage).toContain("instead.");

        consoleWarnSpy.mockRestore();
    });
});