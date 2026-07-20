import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.async", () => {
    it("should handle generator yield", async () => {
        let called = false;
        function* generator() {
            yield Promise.resolve(1);
            called = true;
        }
        const asyncFunction = q.async(generator);
        await asyncFunction();
        expect(called).toBe(true);
    });
});