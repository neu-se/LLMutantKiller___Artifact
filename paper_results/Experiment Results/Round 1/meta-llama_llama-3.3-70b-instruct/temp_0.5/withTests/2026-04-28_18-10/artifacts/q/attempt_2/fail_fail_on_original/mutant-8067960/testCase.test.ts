import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get functionality", () => {
    it("should return a promise for the property value", () => {
        const object = { a: 1 };
        return q.Q(object).get("a").then((value: any) => {
            expect(value).toBe(1);
        });
    });
});