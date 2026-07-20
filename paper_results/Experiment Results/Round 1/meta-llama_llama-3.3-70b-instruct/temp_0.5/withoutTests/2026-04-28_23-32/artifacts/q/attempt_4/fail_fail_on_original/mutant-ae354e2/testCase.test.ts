import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly deprecate a function', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const deprecate = Q.deprecate || function() {};
        const deprecatedFunction = deprecate(function() {}, 'oldFunction', 'newFunction');
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('oldFunction is deprecated, use newFunction instead'));
        consoleWarnSpy.mockRestore();
    });
});