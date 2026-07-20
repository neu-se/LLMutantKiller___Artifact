import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Q.resolve(1);
            yield Q.resolve(2);
            throw new Error("Test error");
        }

        const asyncFunction = Q.async(myGenerator);
        try {
            await asyncFunction();
            throw new Error("async function should throw an error");
        } catch (error) {
            expect(error.message).toBe("Test error");
        }
    });
});