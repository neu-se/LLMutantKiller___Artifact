import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise with a long stack trace when Q.longStackSupport is true', async () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("Test Error"));
        try {
            await promise;
            expect(true).toBe(false);
        } catch (error: any) {
            if (Q.longStackSupport) {
                expect(error.stack.split("\n").length).toBeGreaterThan(2);
            } else {
                expect(error.stack.split("\n").length).toBe(1);
            }
        }
    });
});