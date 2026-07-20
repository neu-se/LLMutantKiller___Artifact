import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject with an error when the operation is not supported", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                if (op === "test") {
                    resolve("Test value");
                } else {
                    throw new Error("Operation not supported");
                }
            }
        }));
        return promise.then(function (value) {
            expect(value).toBe("Test value");
        }, function (error) {
            expect(error.message).toBe("Operation not supported");
        });
    });
});