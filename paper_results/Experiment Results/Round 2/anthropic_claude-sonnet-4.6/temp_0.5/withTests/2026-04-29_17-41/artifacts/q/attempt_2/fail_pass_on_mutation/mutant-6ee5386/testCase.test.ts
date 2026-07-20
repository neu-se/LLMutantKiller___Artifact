import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin behavior when callback throws", () => {
    it("should reject with the new exception when the finally callback throws, even when the original promise is fulfilled", () => {
        const exception = new Error("thrown in finally");

        return (Q("foo") as any)["finally"](function () {
            throw exception;
        }).then(
            function () {
                throw new Error("should not fulfill");
            },
            function (err: any) {
                expect(err).toBe(exception);
            }
        );
    });
});