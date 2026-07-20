import { deprecate } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should call the callback with the correct arguments", () => {
        const callback = jest.fn();
        const name = "test";
        const alternative = "alternative";
        const deprecatedCallback = deprecate(callback, name, alternative);
        deprecatedCallback();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(`${name} is deprecated, use ${alternative} instead.`);
    });
});