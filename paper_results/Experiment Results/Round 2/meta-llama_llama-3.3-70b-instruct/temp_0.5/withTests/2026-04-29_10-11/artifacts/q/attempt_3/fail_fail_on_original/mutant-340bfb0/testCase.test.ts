import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should set a property on an error object without throwing an error", () => {
        const error = new Error();
        const promise = Q();
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, prop, descriptor) {
            if (prop === "__minimumStackCounter__") {
                expect(descriptor.value).toBe(promise.stackCounter);
            }
            return originalDefineProperty.apply(this, arguments);
        };
        makeStackTraceLong(error, promise);
        Object.defineProperty = originalDefineProperty;
    });
});