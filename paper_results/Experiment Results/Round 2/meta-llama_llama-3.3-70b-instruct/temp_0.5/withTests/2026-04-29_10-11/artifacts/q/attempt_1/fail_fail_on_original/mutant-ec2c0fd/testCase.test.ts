import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should work correctly with a generator function", async () => {
        function* generator() {
            yield Q.delay(10);
            return "Hello, World!";
        }

        const asyncGenerator = Q.async(generator);
        const result = await asyncGenerator();
        expect(result).toBe("Hello, World!");
    });

    it("should throw an error if the generator function throws an error", async () => {
        function* generator() {
            yield Q.delay(10);
            throw new Error("Test error");
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow("Test error");
    });
});