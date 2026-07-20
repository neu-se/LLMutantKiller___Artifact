import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle StopIteration exception", async () => {
        function* generator() {
            try {
                yield Promise.reject(new Error("Test error"));
            } catch (e) {
                throw new Error("Caught error: " + e.message);
            }
        }
        const asyncFunction = q.async(generator);
        try {
            await asyncFunction();
            throw new Error("Expected an error to be thrown");
        } catch (error) {
            expect(error.message).toBe("Caught error: Test error");
        }
    });
});