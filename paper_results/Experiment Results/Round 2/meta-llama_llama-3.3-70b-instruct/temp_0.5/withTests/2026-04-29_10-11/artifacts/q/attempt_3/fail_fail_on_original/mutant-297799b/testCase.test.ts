import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const error = new Error("Test error");
        const stackLine = "    at module.js:123:45";
        const isNodeFrame = Q.isNodeFrame(stackLine);
        expect(isNodeFrame).toBe(false);
    });
});