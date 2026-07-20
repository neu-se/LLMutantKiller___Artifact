import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise set method", () => {
    it("should set a property on an object and return a promise for undefined", () => {
        const object: any = {};
        const promise = Q(object).set("test", "value");
        return promise.then((result: any) => {
            expect(result).toBeUndefined();
            expect(object.test).toBe("value");
        });
    });

    it("should reject if the object is not an object", () => {
        const promise = Q("not an object").set("test", "value");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    it.skip("should reject if the key is not a string or symbol", () => {
        const object: any = {};
        const promise = Q(object).set(123, "value");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});