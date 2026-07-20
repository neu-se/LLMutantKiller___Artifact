import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("process.toString() check", () => {
    it("should correctly check process.toString()", () => {
        var processToString = Object.prototype.toString.call(process);
        if (processToString === "[object process]") {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});