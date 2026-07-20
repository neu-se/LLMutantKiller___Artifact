import { Q } from '../../../q.js';

describe('Q', () => {
    it('should not call process.emit when process.emit is not a function', () => {
        // Create a mock process object
        const process = {
            emit: 'not a function',
        };

        // Create a promise and track its rejection
        const promise = Q.reject('Test error');
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });

        // Check if process.emit was called correctly
        expect(process.emit).not.toHaveBeenCalled();
    });
});