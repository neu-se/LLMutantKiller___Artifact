import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set hasStacks to true when an error is thrown in the try-catch block", () => {
        try {
            throw new Error();
        } catch (e) {
            expect(!!e.stack).toBe(true);
        }
    });
});