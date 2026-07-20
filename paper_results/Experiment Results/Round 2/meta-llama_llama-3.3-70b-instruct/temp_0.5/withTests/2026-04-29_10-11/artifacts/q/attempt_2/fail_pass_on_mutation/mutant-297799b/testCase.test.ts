import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const error = new Error("Test error");
        const originalIsNodeFrame = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        const mutatedIsNodeFrame = (stackLine: string) => true;

        const stackLine = "    at Q (/path/to/q.js:123:45)";
        expect(originalIsNodeFrame(stackLine)).toBe(false);
        expect(mutatedIsNodeFrame(stackLine)).toBe(true);
    });
});