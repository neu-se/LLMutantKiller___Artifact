import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections when process.emit is a function and not track when it is not', () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error('Test error'));

        // Mock process.emit to test the behavior
        const originalEmit = process.emit;
        const emitSpy = jest.fn();
        process.emit = emitSpy;

        // Check if process.emit is called when it's a function
        Q.nextTick.runAfter(function () {
            Q.trackRejection(promise, new Error('Test error'));
        });
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', new Error('Test error'), promise);

        // Reset emitSpy
        emitSpy.mockReset();

        // Set process.emit to undefined
        process.emit = undefined;

        // Check if process.emit is not called when it's not a function
        Q.nextTick.runAfter(function () {
            Q.trackRejection(promise, new Error('Test error'));
        });
        expect(emitSpy).not.toHaveBeenCalled();

        // Restore process.emit
        process.emit = originalEmit;
    });
});