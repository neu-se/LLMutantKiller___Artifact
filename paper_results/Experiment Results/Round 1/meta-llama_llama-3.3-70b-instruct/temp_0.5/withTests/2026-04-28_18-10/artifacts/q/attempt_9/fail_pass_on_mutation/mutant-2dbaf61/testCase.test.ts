import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if hasStacks is set to true after a try-catch block with an error", () => {
        let hasStacks: boolean;
        try {
            try {
                throw new Error();
            } catch (e) {
                hasStacks = true;
            }
        } catch (e) {
            hasStacks = false;
        }
        expect(hasStacks).toBe(true);
        try {
            try {
            } catch (e) {
            }
        } catch (e) {
            hasStacks = false;
        }
        expect(hasStacks).toBe(true);
    });
});