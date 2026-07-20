import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should throw an error when used with a non-generator function", () => {
        function nonGeneratorFunction() {
            return Q.delay(10);
        }

        expect(() => Q.async(nonGeneratorFunction)).toThrowError();
    });
});