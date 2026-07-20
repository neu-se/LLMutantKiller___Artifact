import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        // We need to test the behavior of the mutated code, which has the line
        // "if (false)" instead of the original condition.
        // This means that the requestTick function will not be set to process.nextTick,
        // and instead will be set to setTimeout.
        // So, we can test this by checking if the nextTick function uses setTimeout.
        const originalNextTick = Q.nextTick;
        const spy = jest.spyOn(global, 'setTimeout');
        originalNextTick(() => {});
        expect(spy).toHaveBeenCalledTimes(1);
    });
});