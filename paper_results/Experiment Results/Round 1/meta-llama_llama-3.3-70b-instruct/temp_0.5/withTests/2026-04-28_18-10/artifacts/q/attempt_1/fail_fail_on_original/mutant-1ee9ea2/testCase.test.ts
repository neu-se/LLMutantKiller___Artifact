import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q async function", () => {
    it("should handle ES6 generators correctly", () => {
        function* generator() {
            yield 1;
            yield 2;
            return 3;
        }

        const asyncGenerator = Q.async(generator);
        const promise = asyncGenerator();

        return promise.then((value) => {
            expect(value).toBe(3);
        });
    });
});