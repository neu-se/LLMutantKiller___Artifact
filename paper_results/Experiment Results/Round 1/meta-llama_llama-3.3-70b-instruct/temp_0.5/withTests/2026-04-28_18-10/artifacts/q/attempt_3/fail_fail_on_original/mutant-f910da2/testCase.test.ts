import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should correctly handle StopIteration exception", () => {
        function* myGenerator() {
            yield 1;
            yield 2;
            yield 3;
            throw new Error("StopIteration");
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = asyncGenerator();
        return result.then((value) => {
            expect(value).toBeUndefined();
        });
    });
});