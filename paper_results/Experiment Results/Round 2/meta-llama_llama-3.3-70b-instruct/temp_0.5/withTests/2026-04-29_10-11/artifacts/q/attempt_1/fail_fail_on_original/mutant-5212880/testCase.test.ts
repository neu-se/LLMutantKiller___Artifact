import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the callback when done is called with a fulfilled promise", () => {
        var called = false;
        var promise = Q();
        promise.done(function () {
            called = true;
        });
        expect(called).toBe(true);
    });

    it("should not call the callback when done is called with a rejected promise and no errback", () => {
        var called = false;
        var promise = Q.reject();
        promise.done(null, null, function () {
            called = true;
        });
        expect(called).toBe(false);
    });
});