import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle the case when error is null and promise has a stack", () => {
        var error = null;
        var promise = Q.reject(new Error("test"));
        promise.stack = "test stack";
        makeStackTraceLong(error, promise);
        expect(promise.stack).toBe("test stack");
    });
});