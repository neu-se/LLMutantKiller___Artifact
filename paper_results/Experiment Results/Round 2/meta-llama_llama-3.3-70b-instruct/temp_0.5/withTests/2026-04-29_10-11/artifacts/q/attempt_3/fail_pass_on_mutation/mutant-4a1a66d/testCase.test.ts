import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        const asyncFunction = Q.async(function* () {
            yield Q();
            try {
                yield Q.reject("Test");
            } catch (e) {
                expect(e).toBe("Test");
            }
        });

        const resultPromise = asyncFunction();

        await resultPromise;
    });
});