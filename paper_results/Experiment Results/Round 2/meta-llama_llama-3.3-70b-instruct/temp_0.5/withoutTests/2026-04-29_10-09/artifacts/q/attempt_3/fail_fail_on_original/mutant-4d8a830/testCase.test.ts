import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should behave differently when name is null or undefined", () => {
        const obj = {
            foo: function() {
                return "foo";
            }
        };

        const result1 = Q(obj).post("foo", []);
        const result2 = Q(obj).post(null, []);

        expect(result1).resolves.toBe("foo");
        expect(result2).resolves.toBeUndefined();
    });
});