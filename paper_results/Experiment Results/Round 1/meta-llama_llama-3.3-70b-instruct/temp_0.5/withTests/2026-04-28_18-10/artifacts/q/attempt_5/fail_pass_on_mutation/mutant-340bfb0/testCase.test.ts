import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle object_defineProperty", () => {
        const error = new Error();
        const promise = Q(1);
        const p = { stackCounter: 1 };
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, prop, descriptor) {
            if (prop === "__minimumStackCounter__" && descriptor.value === p.stackCounter) {
                expect(obj).toBe(error);
                expect(prop).toBe("__minimumStackCounter__");
                expect(descriptor.value).toBe(1);
            }
            return originalDefineProperty.apply(this, arguments);
        };
        const errorStack = "stack";
        p.stack = errorStack;
        Object.defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
        Object.defineProperty = originalDefineProperty;
        expect(error.__minimumStackCounter__).toBe(1);
    });
});