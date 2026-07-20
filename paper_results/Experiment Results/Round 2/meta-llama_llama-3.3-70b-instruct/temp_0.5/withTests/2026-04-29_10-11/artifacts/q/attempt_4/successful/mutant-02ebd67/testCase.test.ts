import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should call the generator function with the correct 'next' value", async () => {
        var called = false;
        function* generator() {
            yield "next";
            called = true;
        }
        await Q.async(generator)();
        expect(called).toBe(true);
    });
});