import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should reject with an error when an unsupported operation is performed', () => {
        const promise = Q({
            "when": (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("value");
            }
        });
        const fallback = (op: string) => {
            throw new Error(`Promise does not support operation: ${op}`);
        };
        const result = promise.dispatch("unsupportedOperation", null, null);
        expect(result).rejects.toThrowError("Promise does not support operation: unsupportedOperation");
    });
});