import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("coerce function exception handling", () => {
    it("should reject when a thenable throws an exception during assimilation", (done) => {
        const thenable = {
            then: function (resolve: Function, reject: Function, notify: Function) {
                throw new Error("Test exception");
            }
        };

        const promise = Q(thenable);

        promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Test exception");
                done();
            }
        );
    });
});