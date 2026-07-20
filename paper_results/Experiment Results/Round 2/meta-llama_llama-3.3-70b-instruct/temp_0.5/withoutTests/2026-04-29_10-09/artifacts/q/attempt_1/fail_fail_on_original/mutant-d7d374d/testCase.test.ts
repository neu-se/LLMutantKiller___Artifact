import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should log a deprecation warning when using a deprecated function', () => {
        // Create a spy for the console.warn function
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Call the deprecated function
        const deprecatedFunction = Q.deprecate(function () {}, 'testFunction', 'newFunction');
        deprecatedFunction();

        // Restore the original console.warn function
        console.warn = originalWarn;

        // Check if the deprecation warning was logged
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith('testFunction is deprecated, use newFunction instead.', expect.any(Error));
    });
});