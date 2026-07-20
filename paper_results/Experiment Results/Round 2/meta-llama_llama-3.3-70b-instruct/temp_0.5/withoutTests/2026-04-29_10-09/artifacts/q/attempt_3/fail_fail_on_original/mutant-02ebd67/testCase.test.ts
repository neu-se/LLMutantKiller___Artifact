import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should work with a generator that yields a promise", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        return asyncFunction().then((result: any) => {
            expect(result).toBeUndefined();
        });
    });
});