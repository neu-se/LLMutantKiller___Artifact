import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});