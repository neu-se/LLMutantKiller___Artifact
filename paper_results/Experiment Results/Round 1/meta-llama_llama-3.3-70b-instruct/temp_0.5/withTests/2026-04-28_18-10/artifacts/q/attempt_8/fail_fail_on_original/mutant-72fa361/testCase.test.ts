import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("makeStackTraceLong", () => {
    it("should correctly format the stack trace", () => {
        const error = new Error("Test error");
        const promise = q.reject(error);

        const originalStackTrace = error.stack;
        q.makeStackTraceLong(error, promise);
        const newStackTrace = error.stack;

        expect(originalStackTrace).not.toBe(newStackTrace);
    });
});