import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should call the nextTick function when runAfter is called", () => {
        const spy = jest.fn();
        Q.nextTick.runAfter(spy);
        expect(spy).not.toHaveBeenCalled();
        // Force the next tick
        Q.nextTick.flush();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});