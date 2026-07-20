import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections when process.emit is a function', () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error('Test error'));

        // Mock process.emit to test the behavior
        const originalEmit = process.emit;
        process.emit = jest.fn();

        // Track the rejection
        Q.trackRejection(promise, new Error('Test error'));

        // Check if process.emit is called
        expect(process.emit).toHaveBeenCalledTimes(1);
        expect(process.emit).toHaveBeenCalledWith('unhandledRejection', new Error('Test error'), promise);

        // Restore process.emit
        process.emit = originalEmit;
    });
});