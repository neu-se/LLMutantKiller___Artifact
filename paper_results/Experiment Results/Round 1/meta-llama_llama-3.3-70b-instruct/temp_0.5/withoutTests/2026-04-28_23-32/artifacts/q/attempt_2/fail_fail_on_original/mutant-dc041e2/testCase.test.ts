import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when ses is ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => true };

        // Since we can't directly test the behavior of the IIFE, we need to
        // test the behavior of the Q object that is returned by the IIFE.
        // We can test the behavior of the Q object by checking if it does not
        // throw an error when ses is ok.
        expect(() => {
            // If ses is ok, the Q object should not throw an error.
            Q();
        }).not.toThrowError();

        // Restore the original ses object
        global.ses = originalSes;
    });
});