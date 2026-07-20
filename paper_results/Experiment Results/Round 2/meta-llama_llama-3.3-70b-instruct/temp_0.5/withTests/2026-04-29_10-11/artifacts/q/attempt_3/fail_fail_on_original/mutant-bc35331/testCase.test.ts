import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q function with Node.js environment", () => {
    it("should use process.nextTick when in a real Node environment", () => {
        var isNodeJS = typeof process === "object" && process.toString() === "[object process]" && typeof process.nextTick === "function";
        if (isNodeJS) {
            expect(Q.nextTick).toBeDefined();
        } else {
            expect(Q.nextTick).not.toBeDefined();
        }
    });
});