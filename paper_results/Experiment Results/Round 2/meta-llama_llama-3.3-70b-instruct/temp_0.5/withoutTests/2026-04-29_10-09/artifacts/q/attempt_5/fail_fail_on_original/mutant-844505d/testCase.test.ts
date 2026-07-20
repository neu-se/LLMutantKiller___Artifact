import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalOnUnhandledRejection = process.listeners('unhandledRejection').slice();
        const promise = Q.defer().promise;
        Q.done(promise, null, null, null);
        promise.reject(new Error('Test error'));
        expect(process.listeners('unhandledRejection')).toEqual(originalOnUnhandledRejection);
    });
});