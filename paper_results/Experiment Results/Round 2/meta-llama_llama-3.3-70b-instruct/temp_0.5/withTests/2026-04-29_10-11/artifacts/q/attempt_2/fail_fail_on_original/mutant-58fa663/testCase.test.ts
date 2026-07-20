import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test error");

        deferred.reject(error);

        Q.nextTick(() => {
            expect(Q.unhandledRejections).toContain(promise);
            expect(Q.unhandledReasons).toContain(error.stack);
        });
    });
});