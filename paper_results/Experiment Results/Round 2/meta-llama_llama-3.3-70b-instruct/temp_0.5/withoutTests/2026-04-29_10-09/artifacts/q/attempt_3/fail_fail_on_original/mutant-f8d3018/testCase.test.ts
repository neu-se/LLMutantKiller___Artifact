import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should call progressed function when provided and return the value", () => {
        const progressed = jest.fn((value) => value);
        const promise = Q.resolve(1);
        const result = promise.then(void 0, void 0, progressed);
        return result.then((value) => {
            expect(progressed).toHaveBeenCalledTimes(1);
            expect(value).toBe(1);
        });
    });
});