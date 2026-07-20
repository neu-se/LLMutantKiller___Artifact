import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should pass arguments through", () => {
        var bound = Q.fbind(function (a, b) {
            return a + b;
        }, 1);
        return bound(2).then(function (sum) {
            expect(sum).toBe(3);
        });
    });
});