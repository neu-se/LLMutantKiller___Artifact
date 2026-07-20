import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is false', () => {
        // Save the original process object
        const originalProcess = global.process;

        // Temporarily set process to an object with nextTick
        const nextTickSpy = jest.fn();
        global.process = {
            nextTick: nextTickSpy
        };

        // Temporarily set isNodeJS to false
        const originalIsNodeJS = global.isNodeJS;
        global.isNodeJS = false;

        // Try to create a promise using Q
        Q.resolve('test');

        // Check if nextTick is not called
        expect(nextTickSpy).not.toHaveBeenCalled();

        // Restore the original process object and isNodeJS value
        global.process = originalProcess;
        global.isNodeJS = originalIsNodeJS;
    });
});