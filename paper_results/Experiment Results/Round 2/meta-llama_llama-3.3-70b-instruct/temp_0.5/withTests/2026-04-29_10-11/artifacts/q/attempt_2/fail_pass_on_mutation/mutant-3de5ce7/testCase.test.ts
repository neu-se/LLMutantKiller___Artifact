import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it.skip("should correctly parse a stack line with a line number", () => {
        const stackLine = "    at foo (file.js:10:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).not.toBeNull();
        expect(attempt3[1]).toBe("file.js");
        expect(attempt3[2]).toBe("10");
    });

    it("should not parse a stack line with a non-numeric line number", () => {
        const stackLine = "    at foo (file.js:a:5)";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).toBeNull();
    });
});