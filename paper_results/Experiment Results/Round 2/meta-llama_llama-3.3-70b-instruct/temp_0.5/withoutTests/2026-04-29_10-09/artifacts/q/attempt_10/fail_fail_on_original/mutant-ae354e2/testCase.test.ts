import * as q from '../../../../../../../../../../../subject_repositories/q/q.js';

describe("q", () => {
    it("should log a deprecation warning with the correct message", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecateFunction = q.deprecate;
        if (deprecateFunction) {
            deprecateFunction(function () {}, "testFunction", "newFunction")();
            expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringMatching(/testFunction is deprecated, use newFunction instead/), expect.any(Error));
        } else {
            throw new Error("deprecate function not found");
        }
    });
});