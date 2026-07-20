import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
    it("should fulfill when x and y are equal", () => {
        const x = Q(5);
        const y = Q(5);
        return Q.join(x, y).then((result) => {
            expect(result).toBeUndefined();
        });
    });
});