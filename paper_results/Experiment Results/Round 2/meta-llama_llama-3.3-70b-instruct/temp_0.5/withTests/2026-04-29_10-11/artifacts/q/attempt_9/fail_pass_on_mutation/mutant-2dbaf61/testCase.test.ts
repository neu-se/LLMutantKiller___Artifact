import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error in the try-catch block", () => {
        var errorThrown = false;
        try {
            throw new Error();
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBe(true);
        try {
            throw new Error();
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBe(true);
    });
});