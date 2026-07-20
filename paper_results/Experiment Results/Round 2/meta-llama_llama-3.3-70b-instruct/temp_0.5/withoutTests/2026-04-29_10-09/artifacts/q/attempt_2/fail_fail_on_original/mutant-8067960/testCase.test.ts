import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.get function", () => {
    it("should dispatch a 'get' operation for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q.get(object, key);
        expect(result.then).toBeInstanceOf(Function);
        return result.then((value) => {
            expect(value).toBe("bar");
        });
    });
});