import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const originalException = {
            toString: () => "[object StopIteration]",
        };
        const mutatedException = {
            toString: () => "[object StopIteration]",
            instanceof: () => true,
        };

        expect(Q.isStopIteration(originalException)).toBe(true);
        expect(Q.isStopIteration(mutatedException)).toBe(true);

        const exception = {
            toString: () => "[object Error]",
        };
        expect(Q.isStopIteration(exception)).toBe(false);
    });
});