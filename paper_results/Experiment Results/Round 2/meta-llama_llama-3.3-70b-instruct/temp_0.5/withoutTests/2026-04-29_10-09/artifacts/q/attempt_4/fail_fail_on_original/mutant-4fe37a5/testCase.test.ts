import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject when an unsupported operation is performed", () => {
        const promise = Q({
            "when": function () {
                return "value";
            }
        }, function(op) {
            throw new Error("Promise does not support operation: " + op);
        });

        try {
            promise.dispatch(void 0, "unsupportedOperation", []);
        } catch (error) {
            expect(error.message).toBe("Promise does not support operation: unsupportedOperation");
        }
    });
});