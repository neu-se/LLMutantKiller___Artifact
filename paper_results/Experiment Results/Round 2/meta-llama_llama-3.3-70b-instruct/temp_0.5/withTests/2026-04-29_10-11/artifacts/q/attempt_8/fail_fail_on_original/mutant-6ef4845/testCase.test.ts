import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = Q.Promise({
            "when": function (fulfilled, rejected, progressed) {
                fulfilled();
            }
        }, function (op, args) {
            result = op;
        });

        promise.promiseDispatch(null, "nonExistingOperation", ["arg1", "arg2"]);

        expect(result).toBe("nonExistingOperation");
    });
});