import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly build a long stack trace", () => {
        var error = new Error("Test error");
        var promise = Q();
        promise.stackCounter = 1;
        makeStackTraceLong(error, promise);
        expect(error.stack).toContain("makeStackTraceLong");
    });
});