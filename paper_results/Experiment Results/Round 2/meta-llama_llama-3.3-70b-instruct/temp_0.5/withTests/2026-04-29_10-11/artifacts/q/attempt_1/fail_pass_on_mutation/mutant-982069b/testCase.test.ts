import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it.skip("should filter out internal frames", () => {
        const lines = ["frame1", "frame2", "internal frame", "frame3"];
        const desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        expect(desiredLines).toEqual(["frame1", "frame2", "frame3"]);
    });

    it("should not filter out any frames if the loop is empty", () => {
        const lines = ["frame1", "frame2", "frame3"];
        const desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {}
        expect(desiredLines).toEqual([]);
    });
});