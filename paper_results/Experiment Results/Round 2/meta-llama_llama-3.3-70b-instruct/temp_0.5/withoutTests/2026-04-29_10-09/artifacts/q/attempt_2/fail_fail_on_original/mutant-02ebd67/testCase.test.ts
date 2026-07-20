import { Q } from "./../../../q.js";

describe("Q.async function", () => {
    it("should work with a generator that yields a promise", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        return asyncFunction().then((result) => {
            expect(result).toBeUndefined();
        });
    });
});