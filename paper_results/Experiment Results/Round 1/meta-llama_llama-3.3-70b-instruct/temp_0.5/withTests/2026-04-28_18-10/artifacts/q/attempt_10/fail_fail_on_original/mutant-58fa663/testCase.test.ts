import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        deferred.reject(new Error("Test error"));

        expect(Q.getUnhandledReasons().length).toBe(1);

        Q.nextTick(() => {
            promise.catch(() => {
                Q.resetUnhandledRejections();
            });
        });

        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(0);
        });
    });
});