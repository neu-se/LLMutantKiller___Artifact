import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate", () => {
    it("should call the callback and log a deprecation warning", () => {
        const callback = jest.fn();
        const alternative = "newFunction";
        const name = "oldFunction";
        deprecate(callback, name, alternative);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not log a deprecation warning if console.warn is not a function", () => {
        const callback = jest.fn();
        const alternative = "newFunction";
        const name = "oldFunction";
        (console.warn as any) = undefined;
        deprecate(callback, name, alternative);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});