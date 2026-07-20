import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly deprecate a function', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn');
        const deprecatedFunction = Q.deprecate(function() {}, 'oldFunction', 'newFunction');
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('oldFunction is deprecated, use newFunction instead.', expect.any(Error));
        consoleWarnSpy.mockRestore();
    });
});