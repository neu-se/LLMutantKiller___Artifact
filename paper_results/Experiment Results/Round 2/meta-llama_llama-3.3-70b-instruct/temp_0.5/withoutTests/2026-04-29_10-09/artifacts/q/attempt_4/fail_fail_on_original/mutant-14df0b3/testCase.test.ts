import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should call dispatch with the correct arguments when deleting a property', () => {
        const obj = { foo: 'bar' };
        const dispatchSpy = jest.spyOn(Q(obj), 'dispatch');
        Q["delete"](obj, 'foo');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('delete', ['foo']);
    });
});