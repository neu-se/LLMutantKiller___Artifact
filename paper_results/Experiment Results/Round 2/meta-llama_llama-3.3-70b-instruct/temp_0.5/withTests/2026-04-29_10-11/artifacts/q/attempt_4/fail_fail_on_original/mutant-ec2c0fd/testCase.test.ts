import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should work correctly with a generator function", async () => {
        function* generator() {
            if (typeof StopIteration === "undefined") {
                yield Q.delay(10);
                return "Hello, World!";
            } else {
                yield Q.delay(10);
                throw new StopIteration("Test value");
            }
        }

        const asyncGenerator = Q.async(generator);
        const result = await asyncGenerator();
        expect(result).toBe("Hello, World!");
    });
});