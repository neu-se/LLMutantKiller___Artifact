import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle the case where isNodeJS is true', () => {
        // Save the original process object
        const originalProcess = global.process;

        // Temporarily set process to an object without nextTick
        global.process = {
            toString: () => '[object process]',
        };

        // Temporarily set isNodeJS to true
        const originalIsNodeJS = (global as any).isNodeJS;
        (global as any).isNodeJS = true;

        // Try to create a promise using Q
        expect(() => Q.resolve('test')).toThrowError();

        // Restore the original process object and isNodeJS value
        global.process = originalProcess;
        (global as any).isNodeJS = originalIsNodeJS;
    });
});