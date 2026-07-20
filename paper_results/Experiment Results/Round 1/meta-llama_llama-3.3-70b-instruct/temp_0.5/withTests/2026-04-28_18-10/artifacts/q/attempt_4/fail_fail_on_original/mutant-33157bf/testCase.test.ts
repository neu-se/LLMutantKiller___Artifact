import { Q } from '../../../q.js';

describe('Q', () => {
    it('should track unhandled rejections correctly when process is an object and emit is a function', () => {
        const originalProcess = global.process;
        global.process = {
            emit: jest.fn(),
            nextTick: jest.fn(),
        };
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            if (Q.unhandledRejections.indexOf(promise) !== -1) {
                // This should be called
            }
        });
        deferred.reject(new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(1);
        expect((global.process as any).emit).toHaveBeenCalledTimes(1);
        global.process = originalProcess;
    });
});