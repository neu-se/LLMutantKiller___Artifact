import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment", () => {
        return Q.delay("what", 50).then((value) => {
            expect(value).toBe("what");
        });
    });

    it("should not delay rejection", () => {
        var error = new Error("haha!");
        return Q.delay(error, 50).then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error).toBe(error);
            }
        );
    });
});