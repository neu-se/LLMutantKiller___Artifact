const q = require('../../../../../../../../../subject_repositories/q/q.js');

describe("q", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = q.deprecate(function () {}, "testFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringMatching(/testFunction is deprecated, use newFunction instead/), expect.any(Error));
    });
});