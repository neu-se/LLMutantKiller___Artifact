import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the error handler when done is called with a rejected promise and no errback", () => {
        var error = new Error("Test error");
        var called = false;
        q.done = function (fulfilled, rejected, progress) {
            if (rejected) {
                rejected(error);
            }
        };
        q.reject(error).done(null, function (err) {
            expect(err).toBe(error);
            called = true;
        });
        expect(called).toBe(true);
    });
});