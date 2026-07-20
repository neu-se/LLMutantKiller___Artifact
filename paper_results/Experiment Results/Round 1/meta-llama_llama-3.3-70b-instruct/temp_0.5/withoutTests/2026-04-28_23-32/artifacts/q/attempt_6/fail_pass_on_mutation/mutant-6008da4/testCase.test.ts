import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is false', () => {
        // Save the original process object
        const originalProcess = global.process;

        // Temporarily set process to an object with nextTick
        global.process = {
            nextTick: jest.fn(),
            toString: () => '[object process]',
        };

        // Temporarily set isNodeJS to false
        const originalIsNodeJS = (global as any).isNodeJS;
        (global as any).isNodeJS = false;

        // Try to create a promise using Q
        Q.resolve('test');

        // Check if nextTick is not called
        expect((global.process as any).nextTick).not.toHaveBeenCalled();

        // Restore the original process object and isNodeJS value
        global.process = originalProcess;
        (global as any).isNodeJS = originalIsNodeJS;
    });
});