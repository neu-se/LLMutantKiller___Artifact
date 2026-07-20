import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const error = new Error();
        error.stack = "frame1\nframe2\ninternal frame\nframe3";
        const filteredStack = filterStackString(error.stack);
        expect(filteredStack).not.toContain("internal frame");
    });
});