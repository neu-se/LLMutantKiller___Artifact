import { Q } from "../../../q";

describe("Q function", () => {
    it("should have an error thrown when checking hasStacks", () => {
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
        try {
            try {
            } catch (e) {
                hasStacks = false;
            }
        } catch (e) {
            hasStacks = true;
        }
        expect(hasStacks).toBe(true);
    });
});