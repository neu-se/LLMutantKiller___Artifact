import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        // Create a spy for console.warn to check if it was called
        const consoleWarnSpy = jest.spyOn(console, 'warn');

        // Use the deprecate function directly from the Q module
        const deprecatedFunction = Q.deprecate(function() {}, 'deprecatedFunction', 'newFunction');

        // Use a deprecated function
        deprecatedFunction();

        // Check if console.warn was called with the correct message
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
});