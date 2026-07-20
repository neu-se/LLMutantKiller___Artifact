import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
    it("should throw a TypeError with a specific message when the resolver is not a function", () => {
        let error: Error | null = null;
        try {
            Q.promise("not a function");
        } catch (e: any) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain("resolver must be a function");
    });
});