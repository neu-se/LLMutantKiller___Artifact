import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly when process.emit is a function', () => {
        // Mock the process object
        const originalProcess = global.process;
        global.process = {
            emit: jest.fn(),
        };

        // Create a promise that will be rejected
        const rejectedPromise = Q.reject(new Error('Test error'));

        // Check if the rejection is tracked
        Q.nextTick.runAfter(() => {
            expect(global.process.emit).toHaveBeenCalledTimes(1);
            expect(global.process.emit).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), rejectedPromise);
        });

        // Restore the original process object
        global.process = originalProcess;
    });
});