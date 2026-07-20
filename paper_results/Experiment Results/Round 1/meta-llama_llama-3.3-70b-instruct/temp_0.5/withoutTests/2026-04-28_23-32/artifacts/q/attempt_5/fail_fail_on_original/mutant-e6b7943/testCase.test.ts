import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle StopIteration correctly", () => {
        class StopIteration extends Error {}
        function* generator() {
            throw new StopIteration();
        }
        const promise = Q.async(generator)();
        return expect(promise).resolves.toBeUndefined();
    });
});