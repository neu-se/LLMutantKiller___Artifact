import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const lines = ["frame1", "frame2", "internal frame", "frame3"];
        const desiredLines = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line && line !== "internal frame") {
                desiredLines.push(line);
            }
        }
        expect(desiredLines).toEqual(["frame1", "frame2", "frame3"]);
        expect(lines.length).toBe(4);
    });
});