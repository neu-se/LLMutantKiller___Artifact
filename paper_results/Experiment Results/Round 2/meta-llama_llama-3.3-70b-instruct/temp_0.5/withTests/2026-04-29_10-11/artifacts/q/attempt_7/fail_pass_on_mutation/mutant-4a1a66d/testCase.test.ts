import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        const asyncFunction = Q.async(function* () {
            if (typeof StopIteration === "undefined") {
                yield Q(1);
            } else {
                throw new Error("StopIteration is defined");
            }
        });

        const resultPromise = asyncFunction();

        await resultPromise.then((value) => {
            expect(value).toBeUndefined();
        });
    });
});