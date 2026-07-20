import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should reject a promise when an exception is thrown in a generator", () => {
        function* generator() {
            throw new Error("Test error");
        }
        
        const promise = Q.async(generator)();
        return expect(promise).rejects.toThrowError("Test error");
    });
});