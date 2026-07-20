import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        // Create a spy for console.warn to check if it was called
        const consoleWarnSpy = jest.spyOn(console, 'warn');

        // Use a deprecated function from Q
        Q.allResolved([Q.resolve(1)]);

        // Check if console.warn was called with the correct message
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('allResolved is deprecated, use allSettled instead.'), expect.any(Error));
    });
});