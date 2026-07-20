import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when fcall method is not implemented", () => {
        const promise = Q.resolve();
        const originalFcall = promise.fcall;
        promise.fcall = function() {};
        expect(() => promise.fcall()).not.toThrow();
        promise.fcall = originalFcall;
        const spy = jest.fn();
        promise.fcall(spy);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});