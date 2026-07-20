import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject with an error when the operation is not supported", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                resolve("Test value");
            }
        }, function fallback(op, args) {
            throw new Error("Promise does not support operation: " + op);
        }));
        return promise.then(function (value) {
            expect(value).toBe("Test value");
        });
    });
});