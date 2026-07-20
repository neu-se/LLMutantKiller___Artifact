import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle property name", () => {
        const error = new Error();
        const promise = Q(1);
        const p = { stackCounter: 1 };
        const stacks = [];
        stacks.unshift(p);
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, prop, descriptor) {
            if (prop === "__minimumStackCounter__" && descriptor.value === p.stackCounter) {
                expect(obj).toBe(error);
                expect(prop).toBe("__minimumStackCounter__");
            } else if (prop !== "__minimumStackCounter__") {
                throw new Error("Property name should be __minimumStackCounter__");
            }
            return originalDefineProperty.apply(this, arguments);
        };
        Object.defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
        Object.defineProperty = originalDefineProperty;
    });
});