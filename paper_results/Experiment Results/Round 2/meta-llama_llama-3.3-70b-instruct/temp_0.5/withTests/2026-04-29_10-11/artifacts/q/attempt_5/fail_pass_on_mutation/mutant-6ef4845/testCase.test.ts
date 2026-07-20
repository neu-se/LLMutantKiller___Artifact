import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = Q.Promise((resolve, reject) => {
            resolve(Q({
                "when": function () {
                    result = "success";
                }
            }));
        });

        promise.then((value) => {
            value.promiseDispatch(null, "nonExistingOperation", ["arg1", "arg2"]);
        });

        expect(result).toBeUndefined();
    });
});