import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {
            expect(nextTickSpy).toHaveBeenCalledTimes(1);
        });
    });
});