import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = Q.Promise({
            "when": function (resolve, reject) {
                resolve();
            }
        }, function fallback(op) {
            result = op;
        });

        promise.promiseDispatch(null, "nonExistingOperation");

        expect(result).toBe("nonExistingOperation");
    });
});