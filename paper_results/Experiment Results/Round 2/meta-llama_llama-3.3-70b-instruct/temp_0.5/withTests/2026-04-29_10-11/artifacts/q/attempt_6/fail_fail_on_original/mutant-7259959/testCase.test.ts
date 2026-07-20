import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the async function with a generator that yields a promise", () => {
        function* generator() {
            yield Q.delay(10);
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then(() => {
            expect(true).toBe(true);
        });
    });
});