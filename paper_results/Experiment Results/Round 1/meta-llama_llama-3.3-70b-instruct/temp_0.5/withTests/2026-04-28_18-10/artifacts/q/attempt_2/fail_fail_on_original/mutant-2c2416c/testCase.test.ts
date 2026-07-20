import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q.deprecate(function() {}, "test", "newTest")();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("test is deprecated, use newTest", new Error("").stack);
    });
});