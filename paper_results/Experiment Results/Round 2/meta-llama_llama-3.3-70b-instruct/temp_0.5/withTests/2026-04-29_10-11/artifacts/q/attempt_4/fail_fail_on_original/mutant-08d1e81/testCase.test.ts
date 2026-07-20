import { Q } from "../../../../q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var error = new Error("Test error");

        Q.onerror = jest.fn();

        Q.nextTick.runAfter(function () {
            if (promise.isPending()) {
                promise.then(null, function () {});
            }
        });

        deferred.reject(error);

        expect(Q.onerror).toHaveBeenCalledTimes(0);
    });
});