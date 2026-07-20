import * as Q from './q';

describe("Q.join", () => {
    it("should throw an error with a message that includes 'Q can\'t join' when the values are not the same", () => {
        expect(() => Q.join(Q(1), Q(2))).toThrowError(expect.stringMatching(/Q can't join/));
    });
});