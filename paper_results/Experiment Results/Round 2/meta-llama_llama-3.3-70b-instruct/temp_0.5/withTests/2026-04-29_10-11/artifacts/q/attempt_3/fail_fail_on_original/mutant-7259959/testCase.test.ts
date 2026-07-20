import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of the async function with a generator that yields a promise", () => {
        function* generator() {
            if (false) {
                yield Q.delay(10);
            }
        }

        const asyncGenerator = Q.async(generator);
        expect(asyncGenerator()).rejects.toThrowError();
    });
});