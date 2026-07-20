import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle isInternalFrame", () => {
        const fileName = "q.js";
        const lineNumber = 100;
        const qStartingLine = 50;
        const qEndingLine = 150;
        const qFileName = "q.js";

        const result1 = isInternalFrame(`    at test (/${fileName}:100:10)`);
        expect(result1).toBe(false);

        const result2 = isInternalFrame(`    at test (${fileName}:100:10)`);
        expect(result2).toBe(false);

        const result3 = isInternalFrame(`    at test (q.js:100:10)`);
        expect(result3).toBe(true);

        const result4 = isInternalFrame(`    at test (q.js:200:10)`);
        expect(result4).toBe(false);
    });
});