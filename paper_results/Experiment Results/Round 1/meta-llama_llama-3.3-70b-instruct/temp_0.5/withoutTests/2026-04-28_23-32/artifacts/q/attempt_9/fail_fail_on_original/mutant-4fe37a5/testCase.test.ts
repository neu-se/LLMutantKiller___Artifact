import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not throw an error when a fallback is provided for an unsupported operation', () => {
        const promise = Q({
            "when": (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("value");
            }
        }, () => {
            return "fallback";
        });
        expect(promise.dispatch("unsupportedOperation", null, null)).not.toBeUndefined();
    });
});