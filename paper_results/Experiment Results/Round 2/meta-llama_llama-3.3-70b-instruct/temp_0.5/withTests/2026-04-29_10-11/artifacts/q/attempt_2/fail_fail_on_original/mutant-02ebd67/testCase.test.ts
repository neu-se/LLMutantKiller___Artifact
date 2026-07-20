import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should call the generator function with the correct 'next' value", () => {
        var called = false;
        var generator = Q.async(function* () {
            yield "next";
            called = true;
        });
        generator();
        expect(called).toBe(true);
    });
});