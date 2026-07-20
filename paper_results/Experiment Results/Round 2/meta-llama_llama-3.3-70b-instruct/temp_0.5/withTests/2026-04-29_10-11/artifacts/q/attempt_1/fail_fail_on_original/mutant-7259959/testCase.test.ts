import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of the async function with a generator that yields a promise", () => {
        function* generator() {
            try {
                yield Q.delay(10);
            } catch (e) {
                // This line should be executed when the mutation is present
                throw e;
            }
        }

        const asyncGenerator = Q.async(generator);
        expect(asyncGenerator()).rejects.toThrowError();
    });
});