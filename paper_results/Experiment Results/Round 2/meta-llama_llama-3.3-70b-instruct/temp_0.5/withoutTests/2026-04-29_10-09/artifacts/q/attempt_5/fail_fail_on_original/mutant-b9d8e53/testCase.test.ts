import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly parse the stack line", () => {
        const stackLine = "at foo (bar.js:10:34)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        expect(attempt1[2]).not.toBe(attempt2[2]);
    });
});