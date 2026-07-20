import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should filter stack traces correctly", () => {
        const qFileName = "q.js";
        const qEndingLine = 1000;
        const stackLine = `at isInternalFrame (${qFileName}:1234:12)`;

        const result = Q.isInternalFrame(stackLine);
        expect(result).toBe(false);
    });
});