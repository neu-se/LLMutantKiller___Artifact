import { Q } from "../../../../../q";

describe("Q", () => {
    it("should test the behavior of the async function with a generator that yields a promise", () => {
        function* generator() {
            try {
                yield Q.delay(10);
            } catch (e) {
                return Q(e);
            }
        }

        const asyncGenerator = Q.async(generator);
        expect(asyncGenerator()).resolves.not.toThrowError();
    });
});