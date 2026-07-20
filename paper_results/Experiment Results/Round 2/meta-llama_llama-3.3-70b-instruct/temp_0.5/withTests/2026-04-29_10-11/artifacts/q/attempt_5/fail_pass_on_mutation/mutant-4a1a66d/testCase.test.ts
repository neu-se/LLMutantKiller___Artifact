import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        const asyncFunction = Q.async(function* () {
            yield Q();
            yield Q().then(() => {
                throw new Error("Test");
            });
        });

        const resultPromise = asyncFunction();

        await expect(resultPromise).rejects.toThrowError("Test");
    });
});