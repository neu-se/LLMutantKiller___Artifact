import { isNodeFrame } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const stackLine = "    at test (/path/to/test.js:1:1)";
        expect(isNodeFrame(stackLine)).toBe(false);
    });
});