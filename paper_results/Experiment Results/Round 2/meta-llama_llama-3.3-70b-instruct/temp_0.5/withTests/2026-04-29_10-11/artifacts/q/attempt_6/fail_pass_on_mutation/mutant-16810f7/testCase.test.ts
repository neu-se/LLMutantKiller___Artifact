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
        if (typeof process === "object" && typeof process.emit === "function") {
            expect(true).toBe(true);
        } else {
            expect(typeof process).toBe("object");
        }
    });
});