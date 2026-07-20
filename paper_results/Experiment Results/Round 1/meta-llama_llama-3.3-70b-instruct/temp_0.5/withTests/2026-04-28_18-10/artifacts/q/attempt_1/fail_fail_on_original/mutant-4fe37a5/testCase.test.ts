import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject with an error when the operation is not supported", () => {
        const promise = Q({});
        return promise.then(null, (error: any) => {
            expect(error.message).toBe("Promise does not support operation: undefined");
        });
    });
});