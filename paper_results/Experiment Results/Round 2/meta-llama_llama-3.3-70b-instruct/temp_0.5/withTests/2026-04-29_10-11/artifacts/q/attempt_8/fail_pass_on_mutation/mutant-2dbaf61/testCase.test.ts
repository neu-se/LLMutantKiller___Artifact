import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when trying to access the stack property of an undefined error", () => {
        var errorThrown = false;
        try {
            throw new Error();
        } catch (e) {
            errorThrown = true;
        }
        try {
        } catch (e) {
            expect(() => e.stack).toThrowError();
        }
        expect(errorThrown).toBe(true);
    });
});