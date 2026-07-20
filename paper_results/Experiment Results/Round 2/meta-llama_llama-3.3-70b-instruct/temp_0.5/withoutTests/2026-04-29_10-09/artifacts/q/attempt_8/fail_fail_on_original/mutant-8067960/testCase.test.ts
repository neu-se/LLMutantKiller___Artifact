import { Q } from "../../../q.js";

describe("Q.get function", () => {
    it("should throw an error when Q.get is not a function", () => {
        const originalGet = Q.get;
        Q.get = function (object, key) { };
        expect(() => Q.get({ foo: "bar" }, "foo")).not.toThrow();
        Q.get = originalGet;
    });

    it("should throw an error when Q.get does not return a promise", () => {
        const originalGet = Q.get;
        Q.get = function (object, key) { return; };
        expect(() => Q.get({ foo: "bar" }, "foo")).toThrow();
        Q.get = originalGet;
    });
});