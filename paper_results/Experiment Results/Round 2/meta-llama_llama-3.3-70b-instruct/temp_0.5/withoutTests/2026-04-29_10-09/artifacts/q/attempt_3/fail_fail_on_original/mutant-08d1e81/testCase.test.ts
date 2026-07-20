import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections when process.emit is a function', () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error('Test error'));

        // Mock process.emit to test the behavior
        const originalEmit = process.emit;
        const emitSpy = jest.fn();
        process.emit = emitSpy;

        // Track the rejection
        Q.nextTick.runAfter(function () {
            Q.trackRejection(promise, new Error('Test error'));
        });

        // Check if process.emit is called
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', new Error('Test error'), promise);

        // Restore process.emit
        process.emit = originalEmit;
    });
});