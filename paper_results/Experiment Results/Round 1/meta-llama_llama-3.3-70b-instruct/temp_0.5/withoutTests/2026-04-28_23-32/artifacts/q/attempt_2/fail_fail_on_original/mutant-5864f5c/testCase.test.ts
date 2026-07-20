import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        const exception = new Error();
        exception.name = "StopIteration";
        const isStopIteration = Q.isStopIteration(exception);
        expect(isStopIteration).toBe(true);
    });
});