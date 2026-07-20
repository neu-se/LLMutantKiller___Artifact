import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new Error("Test error");

        var onerror = jest.fn();
        Q.onerror = onerror;

        Q.nextTick.runAfter(function () {
            if (promise.isPending()) {
                promise.then(null, function () {});
            }
        });

        deferred.reject(error);

        expect(onerror).toHaveBeenCalledTimes(1);
    });
});