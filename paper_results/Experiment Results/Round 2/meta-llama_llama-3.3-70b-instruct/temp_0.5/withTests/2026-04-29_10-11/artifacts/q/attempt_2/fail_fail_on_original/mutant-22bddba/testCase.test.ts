import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set the Q global correctly", () => {
        var previousQ = global.Q;
        delete global.Q;
        Q(function () {
            // This should be executed in the next turn.
        });
        expect(global.Q).toBeDefined();
        global.Q.noConflict();
        expect(global.Q).toBe(previousQ);
    });
});