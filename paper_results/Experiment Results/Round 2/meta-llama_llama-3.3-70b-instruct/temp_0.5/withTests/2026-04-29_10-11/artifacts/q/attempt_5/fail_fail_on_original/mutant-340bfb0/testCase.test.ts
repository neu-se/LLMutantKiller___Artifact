import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not throw an error when the property name is valid", () => {
        const error = new Error();
        const promise = Q();
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = jest.fn();
        makeStackTraceLong(error, promise);
        expect(Object.defineProperty).toHaveBeenCalledTimes(1);
        expect(Object.defineProperty).toHaveBeenCalledWith(error, "__minimumStackCounter__", expect.any(Object));
        Object.defineProperty = originalDefineProperty;
    });

    it("should throw an error when the property name is empty", () => {
        const error = new Error();
        const promise = Q();
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = jest.fn();
        makeStackTraceLong(error, promise);
        Object.defineProperty = (obj, prop, descriptor) => {
            if (prop === "") {
                throw new Error("Invalid property name");
            }
            return originalDefineProperty(obj, prop, descriptor);
        };
        expect(() => makeStackTraceLong(error, promise)).toThrowError("Invalid property name");
        Object.defineProperty = originalDefineProperty;
    });
});