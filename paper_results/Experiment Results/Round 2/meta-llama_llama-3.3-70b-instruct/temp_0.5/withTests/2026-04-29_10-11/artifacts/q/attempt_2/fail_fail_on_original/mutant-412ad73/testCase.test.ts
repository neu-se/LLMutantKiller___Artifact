import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when Q is not a function", () => {
        const originalQ = Q;
        Q = null;
        expect(() => Q()).toThrowError();
        Q = originalQ;
    });
});