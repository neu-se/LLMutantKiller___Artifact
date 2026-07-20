import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const error = new Error("Test error");
        const stackLine = "    at Q (/path/to/q.js:123:45)";
        const isNodeFrame = Q.isNodeFrame(stackLine);
        expect(isNodeFrame).toBe(false);
    });
});