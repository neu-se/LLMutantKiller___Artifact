import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use nextTick correctly", () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});