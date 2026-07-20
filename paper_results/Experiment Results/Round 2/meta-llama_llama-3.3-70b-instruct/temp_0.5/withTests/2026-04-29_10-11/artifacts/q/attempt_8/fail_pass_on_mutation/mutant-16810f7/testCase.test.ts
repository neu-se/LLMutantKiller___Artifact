import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("tracks unhandled rejections", () => {
        var process = { emit: () => {} };
        q.resetUnhandledRejections();
        var deferred = q.defer();
        var promise = deferred.promise;
        var error = new Error("test");
        deferred.reject(error);
        if (typeof process === "object" && typeof process.emit === "function") {
            expect(q.getUnhandledReasons()).toEqual([error.stack]);
            q.nextTick.runAfter(function () {
                process.emit("unhandledRejection", error, promise);
            });
        }
    });
});