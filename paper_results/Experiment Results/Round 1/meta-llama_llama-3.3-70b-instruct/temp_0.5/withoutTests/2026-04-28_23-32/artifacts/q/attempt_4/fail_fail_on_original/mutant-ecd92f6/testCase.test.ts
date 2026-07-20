import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should throw an error when inspect is not provided and fallback is called with an operation', () => {
        const promise = Q.Promise({}, (op: string) => {
            if (op === "when") {
                throw new Error("Test error");
            }
        });
        expect(() => promise.inspect()).toThrowError();
    });
});