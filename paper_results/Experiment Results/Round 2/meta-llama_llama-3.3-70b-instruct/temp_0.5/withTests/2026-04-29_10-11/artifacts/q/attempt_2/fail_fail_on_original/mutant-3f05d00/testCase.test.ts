import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a finally method on the Promise prototype", () => {
        expect(Q.resolve().finally).toBeInstanceOf(Function);
    });
});