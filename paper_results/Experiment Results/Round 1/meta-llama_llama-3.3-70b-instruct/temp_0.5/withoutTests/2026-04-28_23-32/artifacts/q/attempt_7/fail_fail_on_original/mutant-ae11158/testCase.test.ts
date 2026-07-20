import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
    it("should call Q(callback).nfapply(args) when called with a function and arguments", () => {
        const callback = jest.fn();
        const args = [1, 2];
        const spy = jest.spyOn(Q(callback), 'nfapply');
        Q.nfapply(callback, args);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(args);
    });
});