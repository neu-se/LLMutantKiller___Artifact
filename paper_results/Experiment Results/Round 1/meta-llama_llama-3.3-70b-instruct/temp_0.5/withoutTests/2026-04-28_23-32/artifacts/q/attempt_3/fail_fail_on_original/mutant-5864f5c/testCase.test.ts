import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        function isStopIteration(exception) {
            return Q.isPromiseAlike(exception) && exception instanceof QReturnValue;
        }
        const exception = new QReturnValue();
        const isStopIterationResult = isStopIteration(exception);
        expect(isStopIterationResult).toBe(true);
    });
});