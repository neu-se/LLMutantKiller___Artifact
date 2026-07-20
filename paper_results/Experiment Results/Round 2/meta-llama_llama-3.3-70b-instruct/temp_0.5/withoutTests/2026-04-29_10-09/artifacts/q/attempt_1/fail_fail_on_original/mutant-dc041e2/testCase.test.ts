import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when ses is not ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSesOk = global.ses.ok;
        global.ses = { ok: () => false };

        expect(() => {
            // We need to call the Q function to test its behavior
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original ses object
        global.ses.ok = originalSesOk;
    });
});