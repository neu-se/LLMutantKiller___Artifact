import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should call continuer with 'next' as the first argument", () => {
        const continuerSpy = jest.fn();
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        asyncFunction.continuer = continuerSpy;
        return asyncFunction().then(() => {
            expect(continuerSpy).toHaveBeenCalledTimes(1);
            expect(continuerSpy.mock.calls[0][0]).toBe("next");
        });
    });
});