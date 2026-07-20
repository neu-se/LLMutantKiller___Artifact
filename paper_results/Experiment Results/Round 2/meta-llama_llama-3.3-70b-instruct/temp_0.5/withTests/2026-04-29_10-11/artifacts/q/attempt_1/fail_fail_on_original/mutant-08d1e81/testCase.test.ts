import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new Error("Test error");

        Q.onerror = function (err) {
            expect(err).toBe(error);
        };

        Q.nextTick.runAfter(function () {
            if (Q.isPending(promise)) {
                process.emit("unhandledRejection", error, promise);
            }
        });

        deferred.reject(error);
    });
});