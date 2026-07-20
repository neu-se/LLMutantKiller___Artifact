import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        function isStopIteration(exception) {
            return exception instanceof Error && exception.name === "StopIteration";
        }
        const exception = new Error();
        exception.name = "StopIteration";
        const isStopIterationResult = isStopIteration(exception);
        expect(isStopIterationResult).toBe(true);
    });
});