import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q.deprecate(function () {}, "test", "alternative");
        expect(consoleWarnSpy).toHaveBeenCalledWith("test is deprecated, use alternative");
    });
});