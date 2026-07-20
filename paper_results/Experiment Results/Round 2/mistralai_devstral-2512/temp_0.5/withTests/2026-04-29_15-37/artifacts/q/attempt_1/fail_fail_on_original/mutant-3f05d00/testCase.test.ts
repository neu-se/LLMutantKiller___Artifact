import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise finally method", () => {
    it("should execute the finally callback when promise is fulfilled", () => {
        let finallyCalled = false;
        let result: string | undefined;

        return Q.resolve("success")
            .finally(() => {
                finallyCalled = true;
            })
            .then((value) => {
                result = value;
                expect(finallyCalled).toBe(true);
                expect(result).toBe("success");
            });
    });
});