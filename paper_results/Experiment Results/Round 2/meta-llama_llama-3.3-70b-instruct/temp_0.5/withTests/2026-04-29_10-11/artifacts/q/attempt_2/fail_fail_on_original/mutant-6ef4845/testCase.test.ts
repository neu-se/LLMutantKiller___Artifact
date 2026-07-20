import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the operation", () => {
        var result;
        var promise = Q((resolve, reject) => {
            resolve(Q.Promise({
                "when": function () {
                    result = "success";
                }
            }, function fallback(op) {
                result = op;
            }));
        });

        promise.then((promise) => {
            promise.promiseDispatch(null, "nonExistingOperation");
        });

        return promise.then(() => {
            expect(result).toBe("nonExistingOperation");
        });
    });
});