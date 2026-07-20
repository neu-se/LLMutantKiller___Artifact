import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not print a deprecation warning to the console when using a deprecated function in a non-verbose environment", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const originalConsole = console;
        console = { warn: jest.fn() };
        const deprecatedFunction = Q(function () { }, "testFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
});