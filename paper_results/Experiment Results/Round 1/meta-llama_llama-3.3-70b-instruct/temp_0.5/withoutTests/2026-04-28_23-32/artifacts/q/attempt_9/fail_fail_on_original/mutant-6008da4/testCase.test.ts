import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is true and nextTick is available', () => {
        // Save the original process object
        const originalProcess = global.process;

        // Temporarily set process to an object with nextTick
        const nextTickSpy = jest.fn();
        (global as any).process = {
            nextTick: nextTickSpy,
        };

        // Temporarily set isNodeJS to true
        (global as any).isNodeJS = true;

        // Try to create a promise using Q
        Q.resolve('test');

        // Check if nextTick is called
        expect(nextTickSpy).toHaveBeenCalledTimes(1);

        // Restore the original process object and isNodeJS value
        global.process = originalProcess;
        (global as any).isNodeJS = false;
    });
});