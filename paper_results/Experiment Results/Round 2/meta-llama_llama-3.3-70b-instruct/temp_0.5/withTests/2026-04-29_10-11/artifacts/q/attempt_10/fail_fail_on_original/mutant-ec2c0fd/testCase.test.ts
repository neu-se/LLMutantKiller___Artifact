import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should work correctly with a generator function", async () => {
        function* generator() {
            if (typeof StopIteration === "undefined") {
                yield new Promise(resolve => setTimeout(resolve, 10));
                return "Hello, World!";
            } else {
                yield new Promise(resolve => setTimeout(resolve, 10));
                throw new StopIteration("Test value");
            }
        }

        const asyncGenerator = Q.async(generator);
        const result = await asyncGenerator();
        expect(result).toBe("Hello, World!");
    });

    it("should throw an error if the condition in the async function is always false", async () => {
        function* generator() {
            if (false) {
                yield new Promise(resolve => setTimeout(resolve, 10));
                return "Hello, World!";
            } else {
                throw new Error("Condition is always false");
            }
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow("Condition is always false");
    });
});