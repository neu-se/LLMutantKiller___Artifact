import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        const asyncFunction = Q.async(function* () {
            const generator = (function* () {
                yield Q();
            })();
            const result = generator.next();
            expect(result.done).toBe(false);
            expect(typeof result.value).toBe('object');
            expect(typeof result.value.then).toBe('function');
        });

        const resultPromise = asyncFunction();

        await resultPromise;
    });
});