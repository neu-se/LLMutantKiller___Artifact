import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration function", () => {
    it("should correctly identify StopIteration exceptions", () => {
        const stopIterationException = new Error();
        stopIterationException.name = "StopIteration";
        expect(Q.isStopIteration(stopIterationException)).toBe(true);

        const nonStopIterationException = new Error();
        nonStopIterationException.name = "OtherError";
        expect(Q.isStopIteration(nonStopIterationException)).toBe(false);

        const qReturnValueException = new Q.QReturnValue();
        expect(Q.isStopIteration(qReturnValueException)).toBe(true);
    });
});