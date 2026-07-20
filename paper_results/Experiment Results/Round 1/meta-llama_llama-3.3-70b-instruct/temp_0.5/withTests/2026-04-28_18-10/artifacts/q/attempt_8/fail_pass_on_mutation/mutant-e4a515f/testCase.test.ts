import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when resolver is always true in the mutated code', () => {
        const originalQ = Q;
        Q = function (value) {
            if (typeof value !== "function") {
                throw new Error("Resolver must be a function");
            }
            return originalQ(value);
        };
        expect(() => Q(true)).toThrow();
        Q = originalQ;
    });
});