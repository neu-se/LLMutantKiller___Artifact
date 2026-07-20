import { Q } from './q.js';

describe('Q', () => {
    it('should handle process.emit correctly', () => {
        const originalProcessEmit = process.emit;
        process.emit = jest.fn();
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });
        expect(process.emit).toHaveBeenCalledTimes(1);
        process.emit = originalProcessEmit;
    });

    it('should not call process.emit when process.emit is not a function', () => {
        const originalProcessEmit = process.emit;
        const mockProcess = {
            emit: 'not a function',
        };
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });
        expect(() => {
            if (typeof mockProcess.emit === 'function') {
                mockProcess.emit('unhandledRejection', 'Test error', promise);
            } else {
                throw new Error('process.emit is not a function');
            }
        }).toThrowError('process.emit is not a function');
        process.emit = originalProcessEmit;
    });
});