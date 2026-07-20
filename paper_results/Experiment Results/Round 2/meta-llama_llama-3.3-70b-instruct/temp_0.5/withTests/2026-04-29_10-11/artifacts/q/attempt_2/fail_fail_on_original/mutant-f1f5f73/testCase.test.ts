import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var called = false;
        var promise = Q("foo");
        promise.tap = function(callback) {
            callback = Q(callback);
            return promise.then(function (value) {
                return callback.fcall(value).thenResolve(value);
            });
        }
        var tapPromise = promise.tap(function (value) {
            called = true;
            expect(value).toBe("foo");
        });
        return tapPromise.then(function () {
            expect(called).toBe(true);
        });
    });
});