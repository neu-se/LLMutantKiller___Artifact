import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call finally callback with a function", () => {
        var called = false;
        Q().finally(function () {
            called = true;
        });
        expect(called).toBe(true);
    });
});