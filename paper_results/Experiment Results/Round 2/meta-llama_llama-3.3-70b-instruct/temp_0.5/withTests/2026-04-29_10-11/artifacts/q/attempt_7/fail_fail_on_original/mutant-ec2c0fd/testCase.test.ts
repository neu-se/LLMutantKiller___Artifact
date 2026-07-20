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

    it("should throw an error if the condition in the async function is always false", async () => {
        function* generator() {
            if (false) {
                yield Q.delay(10);
                return "Hello, World!";
            } else {
                throw new Error("Condition is always false");
            }
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow("Condition is always false");
    });
});