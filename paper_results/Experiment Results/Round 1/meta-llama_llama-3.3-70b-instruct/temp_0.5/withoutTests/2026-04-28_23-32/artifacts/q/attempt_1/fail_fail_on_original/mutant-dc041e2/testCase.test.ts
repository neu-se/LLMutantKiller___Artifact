import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should behave as expected when ses is not ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSesOk = global.ses.ok;
        global.ses.ok = () => false;

        // Since we can't directly test the behavior of the IIFE, we need to
        // test the behavior of the Q object that is returned by the IIFE.
        // We can test the behavior of the Q object by checking if it throws
        // an error when ses is not ok.
        expect(() => {
            // If ses is not ok, the Q object should throw an error.
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original ses.ok function
        global.ses.ok = originalSesOk;
    });
});