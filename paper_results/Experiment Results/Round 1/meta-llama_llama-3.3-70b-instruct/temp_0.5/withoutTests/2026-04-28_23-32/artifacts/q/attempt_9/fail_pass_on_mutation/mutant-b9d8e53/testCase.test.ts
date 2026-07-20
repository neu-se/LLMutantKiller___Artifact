import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line with a line number having multiple digits", () => {
        const stackLine = "at foo (bar.js:10:20)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        expect(attempt1).not.toBeNull();
        expect(attempt1[1]).toBe("bar.js");
        expect(attempt1[2]).toBe("10");
        
        // This line will make the test fail on the mutated code
        const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber[1]).toBe(10);
    });
});

function getFileNameAndLineNumber(stackLine) {
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }
    // Other attempts...
}