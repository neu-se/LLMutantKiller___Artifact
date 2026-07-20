import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not have long stack traces by default", () => {
        var error = new Error();
        try {
            throw error;
        } catch (e: any) {
            var hasStacks = !!e.stack;
            if (hasStacks) {
                expect(Q.longStackSupport).toBe(false);
            } else {
                expect(true).toBe(true);
            }
        }
    });
});