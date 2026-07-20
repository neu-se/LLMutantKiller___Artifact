// Test case to detect the mutation in the "set" method of the fulfill function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill set method mutation", () => {
    it("should set property on object when using Q.set", () => {
        const obj = {};
        return Q(obj)
            .set("testProperty", "testValue")
            .then(() => {
                expect(obj.testProperty).toBe("testValue");
            });
    });
});