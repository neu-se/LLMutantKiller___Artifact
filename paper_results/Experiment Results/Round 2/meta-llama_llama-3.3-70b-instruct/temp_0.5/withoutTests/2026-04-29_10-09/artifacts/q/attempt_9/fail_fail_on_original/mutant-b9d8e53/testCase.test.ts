import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly parse the stack line", () => {
        const stackLine = "at foo (bar.js:10:34)";
        const regexOriginal = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const regexMutated = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        expect(regexOriginal[2]).not.toBe(regexMutated[2]);
    });
});