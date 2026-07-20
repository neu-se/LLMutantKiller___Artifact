import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var called = false;
        var promise = Q("foo").tap(function (value) {
            called = true;
            expect(value).toBe("foo");
        });
        return promise.then(function () {
            expect(called).toBe(true);
        });
    });
});