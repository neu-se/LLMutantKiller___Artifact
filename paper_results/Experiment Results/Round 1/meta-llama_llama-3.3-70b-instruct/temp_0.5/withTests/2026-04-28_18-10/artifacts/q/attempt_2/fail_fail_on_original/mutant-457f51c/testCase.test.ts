import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q(Promise.resolve());
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        expect(promise.valueOf()).toBe(promise);
    });
});