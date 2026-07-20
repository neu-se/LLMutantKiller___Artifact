import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", (done) => {
        var callback = jest.fn();
        var promise = q(1);
        promise.done(callback, function () { }, function () { });
        promise.then(function () {
            expect(callback).toHaveBeenCalledTimes(1);
            done();
        });
    });
});