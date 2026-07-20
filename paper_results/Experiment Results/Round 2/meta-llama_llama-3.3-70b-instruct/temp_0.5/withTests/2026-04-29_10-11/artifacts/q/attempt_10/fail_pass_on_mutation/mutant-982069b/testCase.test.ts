import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const lines = ["frame1", "frame2", "internal frame", "frame3"];
        let i = 0;
        const desiredLines = [];
        for (; i < lines.length; i++) {
            const line = lines[i];
            if (line && line !== "internal frame") {
                desiredLines.push(line);
            }
        }
        expect(desiredLines).toEqual(["frame1", "frame2", "frame3"]);
        expect(i).toBeGreaterThan(3);
    });
});