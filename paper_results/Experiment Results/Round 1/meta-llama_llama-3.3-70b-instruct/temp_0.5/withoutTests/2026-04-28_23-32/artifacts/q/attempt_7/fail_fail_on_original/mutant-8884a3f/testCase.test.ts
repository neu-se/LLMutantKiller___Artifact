import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise with a long stack trace when Q.longStackSupport is true', async () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error());
        try {
            await promise;
        } catch (error: any) {
            if (Q.longStackSupport) {
                expect(error.stack).toContain("q.js");
            } else {
                expect(error.stack).not.toContain("q.js");
            }
        }
    });
});