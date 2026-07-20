import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not throw an error when an unsupported operation is performed with a fallback', () => {
        const promise = Q({
            "when": (resolve: (value: any) => void, reject: (reason: any) => void) => {
                resolve("value");
            }
        });
        const fallback = () => {};
        const result = promise.dispatch("unsupportedOperation", null, null);
        expect(() => result).not.toThrowError();
    });
});