import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should return false for a non-internal frame in the original code", () => {
        const originalIsInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 ||
                   stackLine.indexOf("(node.js:") !== -1;
        };

        const stackLine = "at myFunction (myFile.js:10:20)";
        expect(originalIsInternalFrame(stackLine)).toBe(false);
    });

    it("should return true for an internal frame in the mutated code", () => {
        const mutatedIsInternalFrame = (stackLine: string) => {
            return true;
        };

        const stackLine = "at myFunction (myFile.js:10:20)";
        expect(mutatedIsInternalFrame(stackLine)).toBe(true);
    });
});