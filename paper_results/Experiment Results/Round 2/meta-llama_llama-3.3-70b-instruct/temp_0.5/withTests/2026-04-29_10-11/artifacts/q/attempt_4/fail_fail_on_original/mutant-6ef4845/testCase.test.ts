import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = Q.Promise(function (resolve, reject, notify) {
            resolve(Q({
                "when": function () {
                    result = "success";
                }
            }));
        });

        promise.promiseDispatch(null, "nonExistingOperation");

        expect(result).toBe("success");
    });
});