import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when resolver is not a function in the original code', () => {
        const originalQ = Q;
        Q = function (value) {
            if (typeof value === "function") {
                throw new Error("Resolver must not be a function");
            }
            return originalQ(value);
        };
        expect(() => Q(function () { })).toThrow();
        Q = originalQ;
    });
});