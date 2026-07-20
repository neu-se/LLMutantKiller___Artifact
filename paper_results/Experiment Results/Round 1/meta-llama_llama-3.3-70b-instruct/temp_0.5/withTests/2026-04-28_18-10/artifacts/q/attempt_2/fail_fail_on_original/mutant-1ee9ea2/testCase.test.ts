import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q async function", () => {
    it("should handle ES6 generators correctly", () => {
        function* generator() {
            try {
                yield 1;
            } catch (e) {
                throw e;
            }
        }

        const asyncGenerator = Q.async(generator);
        const promise = asyncGenerator();

        return promise.then((value) => {
            expect(value).toBeUndefined();
        });
    });
});