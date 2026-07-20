import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should filter out internal and node frames from stack traces", () => {
        const originalFilterStackString = Q.filterStackString;
        const error = new Error();
        error.stack = `Error
    at internalFrame (q.js:1000:10)
    at nodeFrame (node.js:100:10)
    at userFrame (user.js:10:10)`;
        const filteredStack = originalFilterStackString.call(Q, error.stack);
        expect(filteredStack).toContain("userFrame");
    });
});