import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should track unhandled rejections correctly when process is an object and emit is a function', () => {
        const originalProcess = global.process;
        global.process = { emit: () => {} };
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            if (Q.unhandledRejections.indexOf(promise) !== -1) {
                // This should be called
            }
        });
        deferred.reject(new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(1);
        global.process = originalProcess;
    });

    it('should not track unhandled rejections when process is not an object or emit is not a function', () => {
        const originalProcess = global.process;
        global.process = { emit: null };
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            if (Q.unhandledRejections.indexOf(promise) !== -1) {
                // This should not be called
                throw new Error('Unhandled rejection should not be tracked');
            }
        });
        deferred.reject(new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(0);
        global.process = originalProcess;
    });
});