import { Q } from "./q.js";

describe("Q.async function", () => {
    it("should not throw an error when the verb is 'next'", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        expect(() => asyncFunction()).not.toThrowError();
    });
});