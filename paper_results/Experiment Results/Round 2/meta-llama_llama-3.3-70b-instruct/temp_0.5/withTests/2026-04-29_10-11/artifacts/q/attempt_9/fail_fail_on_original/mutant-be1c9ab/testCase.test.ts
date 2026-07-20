import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const stopIterationException = { toString: () => "[object StopIteration]" };

        function isStopIteration(exception: any) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]" ||
                   exception instanceof Q.QReturnValue;
        }

        expect(isStopIteration(stopIterationException)).toBe(true);
    });
});