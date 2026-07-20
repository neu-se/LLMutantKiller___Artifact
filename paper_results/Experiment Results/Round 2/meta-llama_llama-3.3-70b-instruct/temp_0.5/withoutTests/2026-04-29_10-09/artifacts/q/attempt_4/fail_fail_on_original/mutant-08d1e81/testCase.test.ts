import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not track unhandled rejections when process.emit is not a function', () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error('Test error'));

        // Mock process.emit to test the behavior
        const originalEmit = process.emit;
        process.emit = undefined;

        // Track the rejection
        Q.nextTick.runAfter(function () {
            Q.trackRejection(promise, new Error('Test error'));
        });

        // Check if process.emit is not called
        expect(process.emit).toBeUndefined();

        // Restore process.emit
        process.emit = originalEmit;
    });
});