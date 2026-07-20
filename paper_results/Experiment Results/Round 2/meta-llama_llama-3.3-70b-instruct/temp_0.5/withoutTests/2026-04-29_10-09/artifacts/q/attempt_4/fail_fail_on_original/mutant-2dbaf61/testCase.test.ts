import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle an error with a stack trace", () => {
        try {
            throw new Error();
        } catch (e) {
            const error = e as Error;
            expect(error.stack).toBeDefined();
        }
        expect(Q.hasStacks).toBe(true);
    });
});