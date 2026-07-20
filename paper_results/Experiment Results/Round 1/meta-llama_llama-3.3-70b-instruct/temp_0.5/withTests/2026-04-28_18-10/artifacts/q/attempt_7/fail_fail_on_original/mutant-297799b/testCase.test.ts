import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should not always return true", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        expect(Q.isInternalFrame(stackLine)).not.toBe(true);
    });
});