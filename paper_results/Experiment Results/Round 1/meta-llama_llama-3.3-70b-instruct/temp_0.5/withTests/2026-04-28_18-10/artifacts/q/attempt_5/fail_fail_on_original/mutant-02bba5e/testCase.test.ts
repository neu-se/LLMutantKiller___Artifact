import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle the case when error is not null and promise has no stack", () => {
        var error = new Error("test error");
        var promise = Q.reject(error);
        makeStackTraceLong(error, promise);
        expect(promise.stack).toBeDefined();
    });
});