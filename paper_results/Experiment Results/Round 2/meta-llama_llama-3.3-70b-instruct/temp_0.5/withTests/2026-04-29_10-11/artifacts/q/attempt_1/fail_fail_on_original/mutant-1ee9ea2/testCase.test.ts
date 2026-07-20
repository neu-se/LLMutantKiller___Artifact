import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async generator function", () => {
    it("should work with ES6 generators", () => {
        function* generator() {
            yield Q.delay(10);
            return 10;
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then((value) => {
            expect(value).toBe(10);
        });
    });
});