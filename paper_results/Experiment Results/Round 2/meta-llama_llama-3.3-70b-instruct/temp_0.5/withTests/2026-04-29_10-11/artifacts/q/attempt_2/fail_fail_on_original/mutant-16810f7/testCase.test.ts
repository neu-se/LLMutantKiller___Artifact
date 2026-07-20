import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("tracks unhandled rejections", () => {
        var process = { emit: () => {} };
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new Error("test");
        deferred.reject(error);
        expect(Q.getUnhandledReasons()).toEqual([error.stack]);
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});