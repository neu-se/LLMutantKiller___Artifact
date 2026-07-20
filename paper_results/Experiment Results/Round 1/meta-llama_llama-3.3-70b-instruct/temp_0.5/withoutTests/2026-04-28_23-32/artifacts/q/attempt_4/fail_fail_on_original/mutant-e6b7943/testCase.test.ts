import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should reject a promise when an exception is thrown", () => {
        const promise = Q.reject("Test error");
        return expect(promise).rejects.toThrowError("Test error");
    });
});