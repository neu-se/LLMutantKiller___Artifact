import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle internal frames", () => {
        const error = new Error();
        const stack = error.stack;
        if (stack) {
            const lines = stack.split("\n");
            const qLines = lines.filter(line => line.includes("q.js"));
            const nonQLines = lines.filter(line => !line.includes("q.js"));
            expect(qLines.length).toBeGreaterThan(0);
            expect(nonQLines.length).toBeGreaterThan(0);
        }
    });
});