import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at functionName (filename:123:45)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            expect(attempt1[1]).toBeDefined();
            expect(attempt1[2]).toBeDefined();
        } else {
            throw new Error("Expected attempt1 to be defined");
        }
    });
});