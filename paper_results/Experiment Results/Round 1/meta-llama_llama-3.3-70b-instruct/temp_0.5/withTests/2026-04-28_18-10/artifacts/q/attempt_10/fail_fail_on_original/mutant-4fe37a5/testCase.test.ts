import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject with an error when the operation is not supported", () => {
        const promise = Q({
            "when": function (resolve, op) {
                if (op === "test") {
                    resolve("Test value");
                } else {
                    throw new Error("Operation not supported");
                }
            }
        }, function fallback(op) {
            throw new Error("Promise does not support operation: " + op);
        });
        return promise.then(function (value) {
            expect(value).toBe("Test value");
        }, function (error) {
            expect(error.message).toBe("Operation not supported");
        });
    });
});