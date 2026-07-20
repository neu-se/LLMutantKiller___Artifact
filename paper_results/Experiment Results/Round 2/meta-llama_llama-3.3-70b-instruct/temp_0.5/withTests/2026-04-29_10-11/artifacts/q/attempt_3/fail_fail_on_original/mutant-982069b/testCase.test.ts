import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const lines = ["frame1", "frame2", "internal frame", "frame3"];
        const desiredLines = lines.filter(line => !isInternalFrame(line));
        expect(desiredLines).toEqual(["frame1", "frame2", "frame3"]);
    });
});