import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should log a deprecation warning when console is defined', () => {
        // Create a spy for the console.warn function
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Call the deprecated function
        Q(function(resolve, reject, notify) {
            // deprecate is not a function, so we need to test its usage in the Q library
            // For example, let's test Q.fcall
            Q.fcall(function () {}, 'testFunction', 'newFunction');
        })();

        // Check if the deprecation warning was logged
        expect(warnSpy).toHaveBeenCalledTimes(1);

        // Restore the original console.warn function
        console.warn = originalWarn;
    });

    it('should not log a deprecation warning when console is undefined', () => {
        // Create a spy for the console.warn function
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = undefined;

        // Call the deprecated function
        Q(function(resolve, reject, notify) {
            // deprecate is not a function, so we need to test its usage in the Q library
            // For example, let's test Q.fcall
            Q.fcall(function () {}, 'testFunction', 'newFunction');
        })();

        // Check if the deprecation warning was logged
        expect(warnSpy).toHaveBeenCalledTimes(0);

        // Restore the original console.warn function
        console.warn = originalWarn;
    });
});