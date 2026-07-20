import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject when an unsupported operation is performed", () => {
        const promise = Q({
            "when": function () {
                return "value";
            }
        });

        expect(() => promise.dispatch("unsupportedOperation", [])).toThrowError("Promise does not support operation: unsupportedOperation");
    });
});