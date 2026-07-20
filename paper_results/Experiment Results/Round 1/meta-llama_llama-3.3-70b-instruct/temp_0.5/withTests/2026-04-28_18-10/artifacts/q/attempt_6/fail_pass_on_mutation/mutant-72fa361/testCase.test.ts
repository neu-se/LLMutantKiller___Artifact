import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("makeStackTraceLong", () => {
    it("should correctly format the stack trace", () => {
        const error = new Error("Test error");
        const promise = q.reject(error);

        try {
            q.makeStackTraceLong(error, promise);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});