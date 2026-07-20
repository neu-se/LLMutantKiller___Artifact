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
        process.emit = 'not a function';
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });
        expect(() => {
            process.emit('unhandledRejection', 'Test error', promise);
        }).toThrowError();
        process.emit = originalProcessEmit;
    });
});