import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            try {
                yield Q.resolve(1);
            } catch (error) {
                throw new Error("Test error");
            }
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow("Test error");
    });
});