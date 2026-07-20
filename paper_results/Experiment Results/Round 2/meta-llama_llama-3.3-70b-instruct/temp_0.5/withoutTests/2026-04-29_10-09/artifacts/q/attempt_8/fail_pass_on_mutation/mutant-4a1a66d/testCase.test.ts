import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle generator return value", async () => {
        function* generator() {
            yield Promise.resolve(1);
            return "Test success";
        }
        const asyncFunction = q.async(generator);
        const result = await asyncFunction();
        expect(result).toEqual("Test success");
    });
});