import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not have an exception property for a fulfilled promise", () => {
        const promise = Q(1);
        expect("exception" in promise).toBe(false);
    });
});