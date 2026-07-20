import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object = {};
        const key = "testKey";
        const value = "testValue";
        const dispatchSpy = jest.fn();

        Q(object).dispatch = dispatchSpy;

        Q.set(object, key, value);

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("set", [key, value]);
    });
});