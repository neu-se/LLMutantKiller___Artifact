import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should correctly parse a stack line with a line number and fail with a non-numeric line number in the mutated code", () => {
        const stackLine = "    at foo (file.js:10:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).not.toBeNull();
        expect(attempt3[1]).toBe("file.js");
        expect(attempt3[2]).toBe("10");

        const mutatedStackLine = "    at foo (file.js:a:5)";
        const mutatedAttempt3 = /.*@(.+):(\d+)$/.exec(mutatedStackLine);
        expect(mutatedAttempt3).toBeNull();
    });
});