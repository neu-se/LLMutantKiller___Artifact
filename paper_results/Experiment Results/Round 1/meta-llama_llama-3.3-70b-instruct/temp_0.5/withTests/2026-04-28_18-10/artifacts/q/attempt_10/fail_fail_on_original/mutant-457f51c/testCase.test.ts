import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q.reject(new Error("Test Error"));
        const inspected = promise.inspect();
        expect(inspected.state).toBe("rejected");
        expect(() => promise.exception).toThrowError();
    });
});