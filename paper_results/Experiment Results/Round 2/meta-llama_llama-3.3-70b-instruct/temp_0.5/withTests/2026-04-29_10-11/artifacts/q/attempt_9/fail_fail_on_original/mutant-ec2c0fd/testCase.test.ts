import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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

    it("should throw an error if StopIteration is not handled", async () => {
        function* generator() {
            if (false) {
                yield Q.delay(10);
                return "Hello, World!";
            } else {
                throw new StopIteration("Test value");
            }
        }

        const asyncGenerator = Q.async(generator);
        await expect(asyncGenerator()).rejects.toThrow(StopIteration);
    });
});