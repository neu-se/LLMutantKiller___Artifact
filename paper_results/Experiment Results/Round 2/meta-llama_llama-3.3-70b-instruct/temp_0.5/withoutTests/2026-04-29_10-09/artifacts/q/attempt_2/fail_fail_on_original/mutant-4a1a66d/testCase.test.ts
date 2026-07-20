import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.async", () => {
    it("should handle StopIteration exception", async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            return "Test success";
        });

        const result = await asyncFunction();
        expect(result).toBe("Test success");
    });
});