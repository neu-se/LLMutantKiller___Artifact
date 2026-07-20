import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle StopIteration exception", async () => {
        function* generator() {
            yield Promise.resolve(1);
            throw new StopIteration();
        }
        const asyncFunction = q.async(generator);
        try {
            await asyncFunction();
        } catch (error) {
            if (error instanceof StopIteration) {
                expect(true).toBe(false); // Should not be a StopIteration error
            } else {
                expect(true).toBe(true); // Should be another type of error
            }
        }
    });
});