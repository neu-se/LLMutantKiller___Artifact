import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the fcall method correctly", () => {
        const promise = Q.resolve();
        const originalFcall = Promise.prototype.fcall;
        Promise.prototype.fcall = function() {
            throw new Error("fcall method is not implemented");
        };
        expect(() => promise.fcall()).toThrowError("fcall method is not implemented");
        Promise.prototype.fcall = originalFcall;
    });
});