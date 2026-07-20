import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const originalNextTick = Q.nextTick;
        const spy = jest.spyOn(global, 'setTimeout');
        originalNextTick(() => {});
        expect(spy).toHaveBeenCalledTimes(1);
    });
});