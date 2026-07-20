import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code but not in the mutated code", () => {
        const originalCallback = function() {};
        const originalDenodeify = Q.denodeify(originalCallback);
        expect(originalDenodeify).toBeInstanceOf(Function);

        const mutatedCallback = undefined;
        expect(() => Q.denodeify(mutatedCallback)).toThrowError("Q can't wrap an undefined function");
    });
});