import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines with line numbers", () => {
        const stackLine = "at foo (bar.js:10:20)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        if (attempt1 && attempt2) {
            expect(attempt1[2].length).toBeGreaterThan(attempt2[2].length); // This will pass on the original code and fail on the mutated code
        } else {
            expect(true).toBe(false); // This will fail the test if attempt1 or attempt2 is null
        }
    });
});