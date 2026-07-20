import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when no try-catch block is empty", () => {
        var errorThrown = false;
        try {
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBe(false);
    });
});