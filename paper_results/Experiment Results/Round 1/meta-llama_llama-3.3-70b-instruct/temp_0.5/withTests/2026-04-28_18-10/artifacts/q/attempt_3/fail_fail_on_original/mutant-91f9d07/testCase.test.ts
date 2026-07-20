import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code but not in the mutated code", () => {
        const originalCode = Q.denodeify;
        const mutatedCode = () => { return () => { } };

        expect(() => originalCode(undefined)).toThrowError();
        expect(() => mutatedCode(undefined)).not.toThrowError();
    });
});