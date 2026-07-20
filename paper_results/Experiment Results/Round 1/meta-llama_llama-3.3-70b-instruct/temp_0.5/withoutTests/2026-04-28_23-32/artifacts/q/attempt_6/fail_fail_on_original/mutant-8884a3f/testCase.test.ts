import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise with a long stack trace when Q.longStackSupport is true', async () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("Test Error"));
        try {
            await promise;
        } catch (error: any) {
            expect(error.stack).toContain("Test Error");
        }
    });
});