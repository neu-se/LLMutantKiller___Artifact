import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should join two promises and return the value if they are the same", () => {
        return Q(1).join(Q(1)).then((value) => {
            expect(value).toBe(1);
        });
    });

    it("should reject if the two promises are not the same", () => {
        return Q(1).join(Q(2)).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});