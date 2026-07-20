import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject when the descriptor does not have the given method", () => {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                if (op === "test") {
                    resolve("test");
                }
            }
        }, function fallback(op, args) {
            throw new Error("Fallback called");
        });

        return promise.dispatch("when", ["unknown"]).then(function (value) {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Fallback called");
        });
    });
});