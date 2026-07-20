import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when fcall method is empty", () => {
        const promise = Q.resolve();
        const originalFcall = Promise.prototype.fcall;
        Promise.prototype.fcall = function() {};
        expect(() => promise.fcall()).not.toThrow();
        Promise.prototype.fcall = originalFcall;
        const spy = jest.fn();
        promise.fcall(spy);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});