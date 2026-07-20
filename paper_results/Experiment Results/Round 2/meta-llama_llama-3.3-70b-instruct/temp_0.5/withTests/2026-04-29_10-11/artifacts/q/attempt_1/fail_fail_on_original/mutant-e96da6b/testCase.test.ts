import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment", () => {
        return Q.delay("what", 50).then((value) => {
            expect(value).toBe("what");
        });
    });

    it("should not delay rejection", () => {
        return Q.reject("error").delay(50).then(null, (error) => {
            expect(error).toBe("error");
        });
    });
});