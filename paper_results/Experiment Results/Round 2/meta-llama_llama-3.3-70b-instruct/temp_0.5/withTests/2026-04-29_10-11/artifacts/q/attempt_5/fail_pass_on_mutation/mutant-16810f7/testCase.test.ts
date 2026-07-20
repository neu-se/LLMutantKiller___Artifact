import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("tracks unhandled rejections", () => {
        var process = { emit: () => {} };
        q.resetUnhandledRejections();
        var deferred = q.defer();
        var promise = deferred.promise;
        var error = new Error("test");
        deferred.reject(error);
        expect(q.getUnhandledReasons()).toEqual([error.stack]);
        if (typeof process === "object" && process.emit) {
            promise.then(null, null, null);
            expect(q.getUnhandledReasons()).toEqual([error.stack]);
        } else {
            expect(q.getUnhandledReasons()).toEqual([error.stack]);
        }
    });
});