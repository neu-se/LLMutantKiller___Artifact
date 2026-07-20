import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        function* generator() {
            yield 1;
        }
        const gen = generator();
        const result = gen.next();
        if (result.done) {
            throw new Error("Generator should not be done yet");
        }
        const exception = new Error();
        exception.name = "StopIteration";
        const isStopIteration = Q.isStopIteration(exception);
        expect(isStopIteration).toBe(true);
    });
});