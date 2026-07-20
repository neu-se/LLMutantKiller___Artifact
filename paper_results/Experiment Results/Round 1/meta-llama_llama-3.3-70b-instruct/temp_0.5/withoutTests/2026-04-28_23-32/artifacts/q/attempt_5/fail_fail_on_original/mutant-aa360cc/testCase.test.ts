import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const deprecatedFunction = Q.deprecate(function () {}, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('deprecatedFunction is deprecated, use newFunction instead.', expect.any(Error));
        consoleWarnSpy.mockRestore();
    });

    it('should not warn when using non-deprecated functions', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const nonDeprecatedFunction = function () {};
        nonDeprecatedFunction();
        expect(consoleWarnSpy).not.toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
    });
});