import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle object_defineProperty", () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        const stacks = [];
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function(obj, prop, descriptor) {
            if (prop === "__minimumStackCounter__" && descriptor.value === p.stackCounter) {
                expect(obj).toBe(error);
                expect(prop).toBe("__minimumStackCounter__");
                expect(descriptor.value).toBe(1);
            }
            return originalDefineProperty.apply(this, arguments);
        };
        const stacksPush = Array.prototype.unshift;
        Array.prototype.unshift = function(item) {
            if (item === p.stack) {
                expect(this).toBe(stacks);
            }
            return stacksPush.apply(this, arguments);
        };
        const errorStack = "stack";
        p.stack = errorStack;
        const stacksUnshift = stacks.unshift;
        stacksUnshift(p.stack);
        Object.defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
        Array.prototype.unshift = stacksPush;
        Object.defineProperty = originalDefineProperty;
    });
});