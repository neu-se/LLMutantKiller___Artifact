import { Q } from "./q";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const stack = "Error\n    at q.js:1:1\n    at test.js:1:1";
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toContain("q.js");
    });
});