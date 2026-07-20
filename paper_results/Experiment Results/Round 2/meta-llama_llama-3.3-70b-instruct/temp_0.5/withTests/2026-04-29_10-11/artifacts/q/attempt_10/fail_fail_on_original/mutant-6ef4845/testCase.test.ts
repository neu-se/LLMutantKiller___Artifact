import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result = null;
        var promise = Q.Promise((resolve, reject) => {
            resolve(Q({
                "when": function (fulfilled, rejected, progressed) {
                    fulfilled();
                }
            }));
        }, function (op) {
            result = op;
        });

        promise.then((value) => {
            value.promiseDispatch(null, "nonExistingOperation");
        });

        // This test case will pass on the original code and fail on the mutated code
        expect(result).toBe("nonExistingOperation");
    });
});