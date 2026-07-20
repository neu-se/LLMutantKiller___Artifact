import { Q } from '../../../q.js';

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            if (Q.unhandledRejections.indexOf(promise) !== -1) {
                // This should be called
            }
        });
        deferred.reject(new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(1);
        if (typeof process === "object" && typeof process.emit === "function") {
            expect(process.emit).toHaveBeenCalledTimes(1);
        } else {
            expect(Q.unhandledRejections.length).toBe(1);
        }
    });
});