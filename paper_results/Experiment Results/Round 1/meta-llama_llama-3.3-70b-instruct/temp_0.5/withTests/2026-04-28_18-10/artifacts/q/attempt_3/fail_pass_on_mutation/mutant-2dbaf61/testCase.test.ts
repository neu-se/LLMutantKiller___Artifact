import { Q } from "../../../q";

describe("Q function", () => {
    it("should have hasStacks set to true when an error is thrown in a try-catch block", () => {
        let hasStacks: boolean;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = e.stack !== undefined;
        }
        expect(hasStacks).toBe(true);
    });
});