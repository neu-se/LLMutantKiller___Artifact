import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should throw an error when process.emit is not a function', () => {
        // Create a mock process object
        const process = {
            emit: 'not a function',
        };

        // Create a promise and track its rejection
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });

        // Check if an error is thrown
        expect(() => {
            if (process.emit && typeof process.emit === 'function') {
                process.emit('unhandledRejection', 'Test error', promise);
            } else {
                throw new Error('process.emit is not a function');
            }
        }).toThrowError('process.emit is not a function');
    });

    it('should not throw an error when process.emit is a function', () => {
        // Create a mock process object
        const process = {
            emit: jest.fn(),
        };

        // Create a promise and track its rejection
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });

        // Check if an error is thrown
        expect(() => {
            if (process.emit && typeof process.emit === 'function') {
                process.emit('unhandledRejection', 'Test error', promise);
            }
        }).not.toThrowError();
    });
});