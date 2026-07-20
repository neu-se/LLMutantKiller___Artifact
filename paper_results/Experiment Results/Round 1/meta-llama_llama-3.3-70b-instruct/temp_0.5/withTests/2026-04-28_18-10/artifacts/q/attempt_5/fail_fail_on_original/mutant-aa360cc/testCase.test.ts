import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate", () => {
    it("should call the callback and log a deprecation warning", () => {
        const callback = jest.fn();
        const alternative = "newFunction";
        const name = "oldFunction";
        const deprecatedFunction = deprecate(callback, name, alternative);
        deprecatedFunction();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
    });
});