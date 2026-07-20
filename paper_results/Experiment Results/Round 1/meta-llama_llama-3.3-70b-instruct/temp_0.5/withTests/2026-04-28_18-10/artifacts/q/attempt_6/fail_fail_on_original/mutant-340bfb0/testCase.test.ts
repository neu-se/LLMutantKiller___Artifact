import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle object_defineProperty", () => {
        const error = new Error();
        const promise = Q(1);
        const p = { stackCounter: 1 };
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, prop, descriptor) {
            if (prop === "__minimumStackCounter__") {
                expect(prop).toBe("__minimumStackCounter__");
            }
            return originalDefineProperty.apply(this, arguments);
        };
        makeStackTraceLong(error, promise);
        Object.defineProperty = originalDefineProperty;
        expect(error.__minimumStackCounter__).toBeDefined();
    });
});