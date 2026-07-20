import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Q.resolve(1);
            yield Q.resolve(2);
            return Q.resolve(3);
        }

        const asyncFunction = Q.async(myGenerator);
        const result = await asyncFunction();
        expect(result).toBe(3);
    });
});