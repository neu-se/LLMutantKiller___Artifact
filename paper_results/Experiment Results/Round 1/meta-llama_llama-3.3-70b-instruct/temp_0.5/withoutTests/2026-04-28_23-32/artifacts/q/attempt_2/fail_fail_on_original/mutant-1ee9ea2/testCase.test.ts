import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            yield Q.resolve(1);
            yield Q.resolve(2);
        }

        const asyncGenerator = Q.async(generator);
        const result = asyncGenerator();
        await expect(result).rejects.toThrow();
    });
});