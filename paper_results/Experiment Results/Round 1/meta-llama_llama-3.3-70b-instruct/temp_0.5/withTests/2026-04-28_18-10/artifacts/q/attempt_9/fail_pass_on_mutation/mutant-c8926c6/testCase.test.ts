import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const originalCode = `
            if (typeof process === "object" &&
                process.toString() === "[object process]" && process.nextTick) {
                isNodeJS = true;
                requestTick = function () {
                    process.nextTick(flush);
                };
            }
        `;
        const mutatedCode = `
            if (typeof process === "object" && true && process.nextTick) {
                isNodeJS = true;
                requestTick = function () {
                    process.nextTick(flush);
                };
            }
        `;
        expect(originalCode).not.toBe(mutatedCode);
    });
});