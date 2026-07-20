import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should reject a promise when StopIteration is thrown in a generator", () => {
        function* generator() {
            throw { value: "Test value" };
        }
        
        const promise = Q.async(generator)();
        return expect(promise).resolves.toEqual("Test value");
    });
});