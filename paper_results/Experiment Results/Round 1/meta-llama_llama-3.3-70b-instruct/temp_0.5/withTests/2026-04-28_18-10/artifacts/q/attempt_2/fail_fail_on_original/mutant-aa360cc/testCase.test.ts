import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.deprecate", () => {
    it("should call the original function and log a deprecation warning", () => {
        const originalFunction = jest.fn();
        const deprecateFunction = Q.deprecate(originalFunction, "originalFunction", "newFunction");
        deprecateFunction();
        expect(originalFunction).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
    });
});