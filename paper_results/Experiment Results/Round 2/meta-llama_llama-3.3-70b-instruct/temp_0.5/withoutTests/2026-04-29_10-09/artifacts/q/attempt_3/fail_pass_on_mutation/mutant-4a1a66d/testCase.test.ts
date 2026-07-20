import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle StopIteration exception", async () => {
        function* generator() {
            yield Promise.resolve(1);
            throw new Error("Test error");
        }
        const asyncFunction = q.async(generator);
        try {
            await asyncFunction();
        } catch (error) {
            expect(error.message).toBe("Test error");
        }
    });
});