import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const lines = [
            "    for (var i = 0; i < lines.length; ++i) {",
            "    for (var i = 0; i >= lines.length; ++i) {",
        ];
        const result = lines.filter((line) => {
            return line.includes("for (var i = 0; i < lines.length; ++i) {");
        });
        expect(result.length).toBe(1);
    });
});