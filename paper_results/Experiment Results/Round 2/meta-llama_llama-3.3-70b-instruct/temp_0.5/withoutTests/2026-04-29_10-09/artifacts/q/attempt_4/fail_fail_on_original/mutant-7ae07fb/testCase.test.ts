import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.promise", () => {
    it("should throw a TypeError with a specific message when the resolver is not a function", () => {
        let error: Error | null = null;
        try {
            q.promise("not a function");
        } catch (e: any) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).not.toContain("");
    });
});