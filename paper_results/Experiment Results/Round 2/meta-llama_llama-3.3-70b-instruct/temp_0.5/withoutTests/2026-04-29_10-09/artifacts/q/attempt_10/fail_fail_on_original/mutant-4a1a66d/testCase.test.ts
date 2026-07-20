import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle generator with StopIteration", async () => {
        function* generator() {
            throw new q.QReturnValue("Test success");
        }
        const asyncFunction = q.async(generator);
        const result = await asyncFunction();
        expect(result).toBe("Test success");
    });
});