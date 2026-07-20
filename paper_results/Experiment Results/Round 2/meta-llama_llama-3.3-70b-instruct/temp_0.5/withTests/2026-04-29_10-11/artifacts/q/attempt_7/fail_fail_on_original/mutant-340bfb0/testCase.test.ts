import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not throw an error when the property name is valid", () => {
        const error = new Error();
        const promise = Q();
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = jest.fn();
        makeStackTraceLong(error, promise);
        expect(Object.defineProperty).toHaveBeenCalledTimes(1);
        Object.defineProperty = originalDefineProperty;
    });
});