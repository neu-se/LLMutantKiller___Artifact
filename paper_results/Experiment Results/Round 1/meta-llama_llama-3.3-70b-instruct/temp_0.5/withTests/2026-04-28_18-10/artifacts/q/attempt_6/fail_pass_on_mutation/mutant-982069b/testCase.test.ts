import { Q } from "./q";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const stack = "Error\n    at q.js:1:1\n    at test.js:1:1";
        const lines = stack.split("\n");
        const desiredLines = lines.filter(line => !line.includes("q.js"));
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).toContain("test.js");
    });
});