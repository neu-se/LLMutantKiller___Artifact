import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly deprecate a function', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const deprecate = (callback: Function, name: string, alternative: string) => {
            return function () {
                console.warn(`${name} is deprecated, use ${alternative} instead.`);
                return callback.apply(callback, arguments);
            };
        };
        const deprecatedFunction = deprecate(function() {}, 'oldFunction', 'newFunction');
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('oldFunction is deprecated, use newFunction instead.');
        consoleWarnSpy.mockReset();
        const mutatedFunction = (callback: Function, name: string, alternative: string) => {
            return function () {
                console.warn(`${name}${alternative}`);
                return callback.apply(callback, arguments);
            };
        };
        const mutatedDeprecate = mutatedFunction(function() {}, 'oldFunction', 'newFunction');
        mutatedDeprecate();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).not.toHaveBeenCalledWith('oldFunction is deprecated, use newFunction instead.');
        expect(mutatedDeprecate.toString()).not.toContain('is deprecated, use');
        expect(mutatedDeprecate.toString()).toContain('oldFunctionnewFunction');
    });
});