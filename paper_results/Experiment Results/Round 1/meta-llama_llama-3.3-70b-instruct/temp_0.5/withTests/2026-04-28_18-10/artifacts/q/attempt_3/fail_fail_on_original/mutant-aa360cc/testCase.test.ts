import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate", () => {
    it("should call the callback and log a deprecation warning", () => {
        const callback = jest.fn();
        const alternative = "newFunction";
        const name = "oldFunction";
        const oldDeprecate = deprecate(callback, name, alternative);
        oldDeprecate();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it("should not log a deprecation warning if console.warn is not a function", () => {
        const callback = jest.fn();
        const alternative = "newFunction";
        const name = "oldFunction";
        const oldDeprecate = deprecate(callback, name, alternative);
        (console.warn as any) = undefined;
        oldDeprecate();
        expect(callback).toHaveBeenCalledTimes(1);
    });
});