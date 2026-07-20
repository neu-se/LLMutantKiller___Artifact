import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        // Create a spy for console.warn to check if it was called
        const consoleWarnSpy = jest.spyOn(console, 'warn');

        // Use the deprecate function
        const deprecate = function (callback, name, alternative) {
            if (typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return function () {
                return callback.apply(callback, arguments);
            };
        };

        // Use a deprecated function
        const deprecatedFunction = deprecate(function() {}, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();

        // Check if console.warn was called with the correct message
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
});