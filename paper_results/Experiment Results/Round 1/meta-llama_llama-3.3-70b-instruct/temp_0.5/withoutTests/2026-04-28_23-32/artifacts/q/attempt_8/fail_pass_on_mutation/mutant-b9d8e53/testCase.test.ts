import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line with a line number having multiple digits", () => {
        const stackLine = "at foo (bar.js:100:20)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        expect(attempt1).not.toBeNull();
        expect(attempt1[1]).toBe("bar.js");
        expect(attempt1[2]).toBe("100");
        
        // This line will make the test fail on the mutated code
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        expect(attempt2).toBeNull();
    });
});