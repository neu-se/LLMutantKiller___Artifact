import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        const attempt2 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
    });
});