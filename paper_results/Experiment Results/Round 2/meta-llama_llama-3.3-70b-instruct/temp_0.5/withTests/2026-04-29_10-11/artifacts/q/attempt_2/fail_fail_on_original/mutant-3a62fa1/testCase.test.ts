import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});