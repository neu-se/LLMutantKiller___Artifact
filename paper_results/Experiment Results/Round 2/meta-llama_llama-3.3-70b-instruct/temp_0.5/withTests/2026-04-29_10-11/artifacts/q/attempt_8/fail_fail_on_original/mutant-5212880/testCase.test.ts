import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the error handler when done is called with a rejected promise and no errback", () => {
        var error = new Error("Test error");
        var called = false;
        q.onerror = function (err: any) {
            expect(err).toBe(error);
            called = true;
        };
        q.reject(error).done(function () {
            called = true;
        }, function (err) {
            expect(err).toBe(error);
        });
        expect(called).toBe(true);
    });
});