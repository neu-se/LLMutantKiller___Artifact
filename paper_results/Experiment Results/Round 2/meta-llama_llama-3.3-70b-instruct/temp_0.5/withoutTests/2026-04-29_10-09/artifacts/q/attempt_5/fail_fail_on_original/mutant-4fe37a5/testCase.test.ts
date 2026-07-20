import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject when an unsupported operation is performed", () => {
        const promise = Q({
            "when": function () {
                return "value";
            }
        }, (op: string) => {
            throw new Error(`Promise does not support operation: ${op}`);
        });

        try {
            promise.dispatch(void 0, "unsupportedOperation", []);
        } catch (error: unknown) {
            if (error instanceof Error) {
                expect(error.message).toBe("Promise does not support operation: unsupportedOperation");
            } else {
                throw new Error("Expected error to be an instance of Error");
            }
        }
    });
});