import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should correctly handle StopIteration exception", () => {
        function* myGenerator() {
            if (typeof StopIteration === "undefined") {
                yield 1;
                yield 2;
                yield 3;
                throw new QReturnValue(4);
            } else {
                yield 1;
                yield 2;
                yield 3;
                throw new StopIteration();
            }
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = asyncGenerator();
        return result.then((value) => {
            expect(value).toBe(4);
        });
    });
});