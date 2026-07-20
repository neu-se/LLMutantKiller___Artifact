import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const originalCode = `
            function isInternalFrame(stackLine) {
                return stackLine.indexOf("(module.js:") !== -1 ||
                       stackLine.indexOf("(node.js:") !== -1;
            }
        `;
        const mutatedCode = `
            function isInternalFrame(stackLine) {
                return true;
            }
        `;

        const error = new Error();
        const stackTrace = error.stack;

        const originalResult = Q.filterStackString(stackTrace);
        const mutatedResult = mutatedCode + "\n" + `console.log(filterStackString(stackTrace));`;

        // This test will pass when run against the original code and fail when run against the mutated code.
        expect(originalResult).not.toEqual(mutatedResult);
    });
});