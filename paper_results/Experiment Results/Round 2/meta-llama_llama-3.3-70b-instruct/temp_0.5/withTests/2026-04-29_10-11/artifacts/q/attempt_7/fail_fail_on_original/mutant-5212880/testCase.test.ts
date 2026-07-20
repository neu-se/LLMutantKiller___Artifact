import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the error handler when done is called with a rejected promise and no errback", () => {
        var error = new Error("Test error");
        var called = false;
        Q.onerror = function (err: any) {
            expect(err).toBe(error);
            called = true;
        };
        Q.reject(error).done();
        expect(called).toBe(true);
    });
});