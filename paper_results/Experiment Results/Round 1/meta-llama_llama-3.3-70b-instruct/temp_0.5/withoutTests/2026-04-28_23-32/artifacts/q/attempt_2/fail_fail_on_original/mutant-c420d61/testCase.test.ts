import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly identify Node.js frames in stack traces", () => {
        const error = new Error("Test error");
        Error.captureStackTrace(error);
        const stack = error.stack;
        const lines = stack ? stack.split("\n") : [];
        const isNodeFrame = lines.some((line) => line.indexOf("(node.js:") !== -1);
        expect(isNodeFrame).toBe(true);
    });
});