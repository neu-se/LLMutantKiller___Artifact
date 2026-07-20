import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle unhandled rejections correctly', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
    });
});