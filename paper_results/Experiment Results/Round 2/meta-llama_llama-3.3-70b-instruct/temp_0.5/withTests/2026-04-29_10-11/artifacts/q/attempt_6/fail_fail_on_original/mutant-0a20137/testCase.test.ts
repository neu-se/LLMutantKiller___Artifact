import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when Q.join is called without any implementation", () => {
        const originalJoin = Q.join;
        Q.join = function () {};
        expect(() => Q.join()).toThrow();
        Q.join = originalJoin;
    });
});