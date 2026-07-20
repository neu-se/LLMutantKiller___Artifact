import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            try {
                yield Q.resolve(1);
                yield Q.resolve(2);
                return Q.resolve(3);
            } catch (e) {
                throw new Error("Generator threw an error");
            }
        }

        const asyncFunction = Q.async(myGenerator);
        try {
            await asyncFunction();
        } catch (e) {
            expect(e.message).toBe("Generator threw an error");
        }
    });
});