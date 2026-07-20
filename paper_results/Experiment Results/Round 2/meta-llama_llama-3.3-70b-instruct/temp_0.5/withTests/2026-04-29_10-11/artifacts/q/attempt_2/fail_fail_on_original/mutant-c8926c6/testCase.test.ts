import { Q } from "../../../../../q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        const processNextTickSpy = jest.spyOn(process, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        expect(processNextTickSpy).toHaveBeenCalledTimes(1);
        nextTickSpy.mockRestore();
        processNextTickSpy.mockRestore();
    });
});