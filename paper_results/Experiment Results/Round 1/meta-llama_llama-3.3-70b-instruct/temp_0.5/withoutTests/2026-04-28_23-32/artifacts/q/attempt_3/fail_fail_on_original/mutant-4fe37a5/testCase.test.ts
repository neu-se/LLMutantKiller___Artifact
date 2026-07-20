import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should reject with an error when an unsupported operation is performed', () => {
        const promise = Q({
            "when": (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("value");
            }
        });
        expect(() => promise.dispatch("unsupportedOperation", null, null)).toThrowError("Promise does not support operation: unsupportedOperation");
    });
});