import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("unhandled rejection reporting", () => {
    it("reports unhandled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.resetUnhandledRejections();
        deferred.reject(new Error("Test error"));
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});