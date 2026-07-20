import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should call the generator function with the correct context", () => {
        var context = {};
        var generator = Q.async(function* () {
            expect(this).toBe(context);
        });
        generator.call(context);
    });
});