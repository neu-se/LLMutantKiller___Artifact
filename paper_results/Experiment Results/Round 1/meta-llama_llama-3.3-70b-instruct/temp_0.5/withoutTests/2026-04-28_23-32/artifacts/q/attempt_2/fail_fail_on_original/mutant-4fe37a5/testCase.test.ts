import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should reject with an error when an unsupported operation is performed', () => {
        const promise = Q({
            "when": function (fulfilled, rejected) {
                return fulfilled("value");
            }
        });
        expect(() => promise.dispatch("unsupportedOperation", null, null)).toThrowError("Promise does not support operation: unsupportedOperation");
    });
});