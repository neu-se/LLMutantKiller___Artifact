import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin with synchronously throwing callback", () => {
    it("should propagate rejection reason when fin callback throws synchronously on rejected promise", () => {
        const originalError = new Error("original");
        const newError = new Error("new error from fin");

        return Q.reject(originalError)
            ["finally"](function() {
                throw newError;
            })
            .then(
                function() { throw new Error("should not fulfill"); },
                function(err: Error) {
                    expect(err).toBe(newError);
                }
            );
    });
});