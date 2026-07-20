import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property on an object", () => {
        const obj = {};
        const promise = Q(obj).set("test", "value");
        return promise.then((result) => {
            expect(obj.test).toBe("value");
        });
    });

    it("should reject if the object is not settable", () => {
        const obj = Object.freeze({});
        const promise = Q(obj).set("test", "value");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeInstanceOf(TypeError);
        });
    });

    it("should reject if the property name is not a string or symbol", () => {
        const obj = {};
        const promise = Q(obj).set(123, "value");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeInstanceOf(TypeError);
        });
    });
});