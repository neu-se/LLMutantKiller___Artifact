import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var called = false;
        var promise = Q("foo");
        promise.tap = function(callback) {
            callback("foo");
        }
        promise.tap(function (value) {
            called = true;
            expect(value).toBe("foo");
        });
        expect(called).toBe(true);
    });
});