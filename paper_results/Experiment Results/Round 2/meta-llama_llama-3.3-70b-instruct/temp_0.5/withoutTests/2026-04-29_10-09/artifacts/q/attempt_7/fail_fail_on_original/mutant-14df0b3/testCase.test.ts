import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should call dispatch when Q["delete"] is called', () => {
        const obj = { foo: 'bar' };
        const dispatchSpy = jest.spyOn(Q(obj), 'dispatch');
        Q["delete"](obj, 'foo');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('delete', ['foo']);
    });
});