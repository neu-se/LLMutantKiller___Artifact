import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.filterStackString", () => {
    it("should filter out internal and Node frames", () => {
        const error = new Error();
        error.stack = `Error
    at foo (internal/index.js:1:1)
    at bar (node:internal/process/promises:1:1)
    at baz (example.js:1:1)`;
        const filteredStack = Q.filterStackString(error.stack);
        expect(filteredStack).not.toContain("internal/index.js");
        expect(filteredStack).not.toContain("node:internal/process/promises");
        expect(filteredStack).toContain("example.js");
    });
});