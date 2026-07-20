import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should include the stack trace of the promise", () => {
        var error = new Error("Test error");
        var promise = q.Q(error);
        var result = promise.inspect();
        expect(result.state).toBe("rejected");
        expect(result.reason).toBe(error);
        expect(result.reason.stack).toContain("Test error");
    });
});