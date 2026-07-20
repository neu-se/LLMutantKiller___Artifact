import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q behavior in a browser environment", () => {
    it("should create a global Q object when executed as a script", () => {
        // Since the mutation changes the behavior of Q in a browser environment,
        // we can test this by checking if the Q object is created as a global variable.
        expect(typeof global.Q).toBe("function");
    });
});