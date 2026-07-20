import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const stackLine = "    at Q (/path/to/q.js:123:45)";
        expect(Q.isNodeFrame(stackLine)).toBe(false);
        const anotherStackLine = "    at module.js:123:45";
        expect(Q.isNodeFrame(anotherStackLine)).toBe(true);
    });
});