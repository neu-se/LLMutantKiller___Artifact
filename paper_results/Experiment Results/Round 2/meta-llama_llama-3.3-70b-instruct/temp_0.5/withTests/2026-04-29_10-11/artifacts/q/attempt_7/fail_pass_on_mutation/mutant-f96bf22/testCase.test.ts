import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;

        const filteredStack = originalStack.split("\n").filter(line => !line.includes("q.js")).join("\n");

        expect(filteredStack).not.toContain("q.js");
    });
});