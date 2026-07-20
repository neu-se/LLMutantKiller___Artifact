import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.filterStackString", () => {
    it("should filter out internal and Node frames correctly", () => {
        const error = new Error();
        error.stack = `Error
    at foo (internal/index.js:1:1)
    at bar (node:internal/process/promises:1:1)
    at baz (example.js:1:1)`;
        const originalFilterStackString = Q.filterStackString(error.stack);
        const lines = originalFilterStackString.split('\n');
        expect(lines.length).toBe(1);
        expect(lines[0]).toContain('example.js');
    });
});