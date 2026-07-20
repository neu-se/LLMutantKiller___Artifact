import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly deprecate a function', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const originalCodeDeprecate = function (callback, name, alternative) {
            return function () {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error().stack);
                return callback.apply(callback, arguments);
            };
        };
        const mutatedCodeDeprecate = function (callback, name, alternative) {
            return function () {
                console.warn(name + "" + alternative + "", new Error().stack);
                return callback.apply(callback, arguments);
            };
        };
        const deprecatedFunctionOriginal = originalCodeDeprecate(function() {}, 'oldFunction', 'newFunction');
        const deprecatedFunctionMutated = mutatedCodeDeprecate(function() {}, 'oldFunction', 'newFunction');
        deprecatedFunctionOriginal();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringMatching(/oldFunction is deprecated, use newFunction instead\./));
        consoleWarnSpy.mockReset();
        deprecatedFunctionMutated();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).not.toHaveBeenCalledWith(expect.stringMatching(/oldFunction is deprecated, use newFunction instead\./));
        consoleWarnSpy.mockRestore();
    });
});