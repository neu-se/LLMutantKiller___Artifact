import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is rejected", (done) => {
        var callback = jest.fn();
        var promise = q.reject("Test error");
        promise.done(null, callback, function () { });
        promise.catch(function (error) {
            expect(callback).toHaveBeenCalledTimes(1);
            expect(error).toBe("Test error");
            done();
        });
    });
});