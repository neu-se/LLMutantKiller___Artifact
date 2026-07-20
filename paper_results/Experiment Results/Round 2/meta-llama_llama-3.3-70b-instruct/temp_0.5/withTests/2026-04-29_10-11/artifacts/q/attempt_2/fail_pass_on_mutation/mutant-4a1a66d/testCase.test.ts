import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        const asyncFunction = Q.async(function* () {
            yield Q();
            return "resolved";
        });

        const resultPromise = asyncFunction();

        await resultPromise.then((result) => {
            expect(result).toBe("resolved");
        });
    });
});