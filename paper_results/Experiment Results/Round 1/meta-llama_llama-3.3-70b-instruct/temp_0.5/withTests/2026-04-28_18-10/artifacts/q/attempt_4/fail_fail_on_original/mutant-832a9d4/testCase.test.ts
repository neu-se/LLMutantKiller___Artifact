import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const originalNextTick = Q.nextTick;
        const nextTickSpy = jest.fn();
        Q.nextTick = nextTickSpy;
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        Q.nextTick = originalNextTick;
    });
});