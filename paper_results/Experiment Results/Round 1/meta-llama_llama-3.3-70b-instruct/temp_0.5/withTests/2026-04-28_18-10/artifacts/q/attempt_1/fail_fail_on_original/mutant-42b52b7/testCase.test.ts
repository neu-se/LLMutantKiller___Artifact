import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.resetUnhandledRejections();
        deferred.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});