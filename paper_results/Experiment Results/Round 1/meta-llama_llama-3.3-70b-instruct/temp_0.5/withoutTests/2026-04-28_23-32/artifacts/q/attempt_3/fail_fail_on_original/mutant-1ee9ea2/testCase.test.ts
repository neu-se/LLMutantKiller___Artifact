import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            yield Q.resolve(1);
            throw new Error("Test error");
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow("Test error");
    });
});