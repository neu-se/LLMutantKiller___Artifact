import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function", () => {
    it("should throw an error when the condition for fileNameAndLineNumber is met in the mutated code", () => {
        const condition = (fileNameAndLineNumber: any) => {
            if (fileNameAndLineNumber) {
                throw new Error("Condition met");
            }
        };

        expect(() => condition("")).toThrowError("Condition met");
        expect(() => condition(null)).not.toThrowError();
        expect(() => condition(undefined)).not.toThrowError();
    });
});