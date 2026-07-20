import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the error handler when done is called with a rejected promise and no errback", () => {
        var error = new Error("Test error");
        var called = false;
        q.Q.onerror = function (err) {
            expect(err).toBe(error);
            called = true;
        };
        q.Q.reject(error).done();
        expect(called).toBe(true);
    });
});