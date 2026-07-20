import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        nextTickSpy.mockRestore();
    });
});