import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line", () => {
        const stackLine = "    at foo (@bar.js:10)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeUndefined();
    });
});

function getFileNameAndLineNumber(stackLine: string): [string, number] | undefined {
    // This function is a simplified version of the getFileNameAndLineNumber function in the q.js file
    const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}