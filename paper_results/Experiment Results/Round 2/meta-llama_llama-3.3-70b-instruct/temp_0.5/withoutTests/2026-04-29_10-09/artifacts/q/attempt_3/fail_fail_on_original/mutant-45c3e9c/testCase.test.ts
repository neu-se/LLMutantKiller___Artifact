import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should call the requestTick function when nextTick.runAfter is called", () => {
        const originalRequestTick = Q.nextTick.requestTick;
        const spy = jest.fn();
        Q.nextTick.requestTick = spy;
        Q.nextTick.runAfter(() => {});
        expect(spy).toHaveBeenCalledTimes(1);
        Q.nextTick.requestTick = originalRequestTick;
    });
});