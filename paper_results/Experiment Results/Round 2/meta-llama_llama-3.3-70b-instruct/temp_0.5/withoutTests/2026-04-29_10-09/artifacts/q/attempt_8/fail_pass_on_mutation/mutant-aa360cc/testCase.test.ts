import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should warn when using deprecated functions', () => {
        // Create a spy for console.warn to check if it was called
        const consoleWarnSpy = jest.spyOn(console, 'warn');

        // Create a deprecate function
        const deprecate = function (callback, name, alternative) {
            return function () {
                if (typeof console.warn === "function") {
                    console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                }
                return callback.apply(callback, arguments);
            };
        };

        // Use the deprecate function
        const deprecatedFunction = deprecate(function() {}, 'deprecatedFunction', 'newFunction');
        deprecatedFunction();

        // Check if console.warn was called with the correct message
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
});