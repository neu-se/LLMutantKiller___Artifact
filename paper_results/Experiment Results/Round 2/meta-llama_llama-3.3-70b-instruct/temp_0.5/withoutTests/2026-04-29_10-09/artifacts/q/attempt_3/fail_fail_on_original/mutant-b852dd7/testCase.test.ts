import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle process.emit correctly', () => {
        // Create a mock process object
        const process = {
            emit: jest.fn(),
        };

        // Create a promise and track its rejection
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            if (process.emit && typeof process.emit === 'function') {
                process.emit('unhandledRejection', 'Test error', promise);
            }
        });

        // Check if process.emit was called correctly
        expect(process.emit).toHaveBeenCalledTimes(1);
        expect(process.emit).toHaveBeenCalledWith('unhandledRejection', 'Test error', promise);
    });
});