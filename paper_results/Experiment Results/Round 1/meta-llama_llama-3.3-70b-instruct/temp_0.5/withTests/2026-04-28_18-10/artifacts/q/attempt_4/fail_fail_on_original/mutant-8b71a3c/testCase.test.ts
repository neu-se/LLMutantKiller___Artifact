import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle inspected state correctly for fulfilled promises", () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        expect(inspected.value).toBe(10);
    });
});