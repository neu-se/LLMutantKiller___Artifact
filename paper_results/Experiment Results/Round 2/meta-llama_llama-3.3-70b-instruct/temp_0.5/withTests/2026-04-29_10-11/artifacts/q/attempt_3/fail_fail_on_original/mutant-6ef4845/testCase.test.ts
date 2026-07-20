import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = q.Promise({
            "when": function () {
                result = "success";
            }
        }, function fallback(op) {
            result = op;
        });

        promise.promiseDispatch(null, "nonExistingOperation");

        expect(result).toBe("nonExistingOperation");
    });
});