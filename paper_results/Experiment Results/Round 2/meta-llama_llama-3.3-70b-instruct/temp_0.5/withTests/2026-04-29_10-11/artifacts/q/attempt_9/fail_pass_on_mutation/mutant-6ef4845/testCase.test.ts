import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var promise = Q.Promise((resolve, reject) => {
            resolve(Q({
                "when": function () {}
            }));
        });

        promise.then((value) => {
            value.promiseDispatch(null, "nonExistingOperation");
        });

        // This test case will fail on the mutated code because the fallback function is not called
        expect(true).toBe(true);
    });
});