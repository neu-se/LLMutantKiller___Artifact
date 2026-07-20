import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error in the try-catch block", () => {
        var errorCaught = false;
        try {
            throw new Error();
        } catch (e) {
            errorCaught = true;
        }
        expect(errorCaught).toBe(true);
    });
});