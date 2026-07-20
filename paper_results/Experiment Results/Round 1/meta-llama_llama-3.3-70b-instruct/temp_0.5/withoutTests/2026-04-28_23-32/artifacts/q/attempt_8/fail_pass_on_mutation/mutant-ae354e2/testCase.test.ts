import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly deprecate a function', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const originalCodeDeprecate = (callback: Function, name: string, alternative: string) => {
            return function () {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
                return callback.apply(callback, arguments);
            };
        };
        const deprecatedFunctionOriginal = originalCodeDeprecate(function() {}, 'oldFunction', 'newFunction');
        deprecatedFunctionOriginal();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('oldFunction is deprecated, use newFunction instead.');
        consoleWarnSpy.mockReset();
        const mutatedCodeDeprecate = (callback: Function, name: string, alternative: string) => {
            return function () {
                console.warn(`${name}${alternative}`);
                return callback.apply(callback, arguments);
            };
        };
        const mutatedFunction = mutatedCodeDeprecate(function() {}, 'oldFunction', 'newFunction');
        mutatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).not.toHaveBeenCalledWith('oldFunction is deprecated, use newFunction instead.');
        consoleWarnSpy.mockRestore();
        expect(mutatedFunction.toString()).not.toContain('is deprecated, use');
    });
});