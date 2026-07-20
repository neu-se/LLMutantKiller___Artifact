import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should call the flushing function when nextTick.runAfter is called", () => {
        const originalFlush = Q.nextTick.flush;
        const spy = jest.fn();
        Q.nextTick.flush = spy;
        Q.nextTick.runAfter(() => {});
        Q.nextTick.runAfter(() => {});
        expect(spy).toHaveBeenCalledTimes(1);
        Q.nextTick.flush = originalFlush;
    });
});