import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const name = "testFunction";
        const alternative = "newFunction";
        const error = new Error();
        deprecate(function () {}, name, alternative);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(`${name} is deprecated, use ${alternative} instead.`, error.stack);
    });
});