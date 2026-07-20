import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.reject("test");
        if (typeof process === "object" && typeof process.emit === "function") {
            expect(Q.untrackRejection).toThrowError();
        } else {
            Q.untrackRejection(promise);
        }
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});