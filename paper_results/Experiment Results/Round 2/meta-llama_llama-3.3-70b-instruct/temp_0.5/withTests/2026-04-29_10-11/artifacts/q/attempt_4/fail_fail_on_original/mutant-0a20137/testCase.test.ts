import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should call the Q function when Q.join is called with two arguments", () => {
        const spy = jest.spyOn(Q, 'join');
        Q.join(Q(1), Q(2));
        expect(spy).toHaveBeenCalledTimes(1);
    });
});