import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should not throw an error when the verb is 'next'", () => {
        const continuerSpy = jest.fn();
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        asyncFunction.continuer = continuerSpy;
        expect(() => asyncFunction()).not.toThrowError();
    });
});