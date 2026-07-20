import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", (done) => {
        var callback = jest.fn(function () {
            throw new Error("Test error");
        });
        var promise = q(1);
        promise.done(callback, function () { }, function () { });
        q.onerror = function (error) {
            expect(error.message).toBe("Test error");
            done();
        };
    });
});