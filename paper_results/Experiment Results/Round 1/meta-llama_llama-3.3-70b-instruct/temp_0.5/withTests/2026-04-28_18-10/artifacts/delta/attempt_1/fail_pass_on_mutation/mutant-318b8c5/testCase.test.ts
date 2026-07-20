import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with insert and delete', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const expected = new Delta().retain(1).insert('B');
    expect(a.diff(b)).toEqual(expected);
  });

  it('diff() with max instead of min', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const originalDiff = Delta.prototype.diff;
    Delta.prototype.diff = function (other, cursor) {
      const strings = [this, other].map((delta) => {
        return delta
          .map((op) => {
            if (op.insert != null) {
              return typeof op.insert === 'string' ? op.insert : String.fromCharCode(0);
            }
            const prep = delta === other ? 'on' : "";

            throw new Error('diff() called ' + prep + ' non-document');
          })
          .join('');
      });
      const retDelta = new Delta();
      const diffResult = require('fast-diff')(strings[0], strings[1], cursor);
      const thisIter = new Delta.Iterator(this.ops);
      const otherIter = new Delta.Iterator(other.ops);
      diffResult.forEach((component) => {
        let length = component[1].length;
        while (length > 0) {
          let opLength = 0;
          switch (component[0]) {
            case require('fast-diff').INSERT:
              opLength = Math.max(otherIter.peekLength(), length);
              retDelta.push(otherIter.next(opLength));
              break;
            case require('fast-diff').DELETE:
              opLength = Math.min(length, thisIter.peekLength());
              thisIter.next(opLength);
              retDelta.delete(opLength);
              break;
            case require('fast-diff').EQUAL:
              opLength = Math.min(
                thisIter.peekLength(),
                otherIter.peekLength(),
                length,
              );
              const thisOp = thisIter.next(opLength);
              const otherOp = otherIter.next(opLength);
              if (require('lodash.isequal')(thisOp.insert, otherOp.insert)) {
                retDelta.retain(
                  opLength,
                  require('./AttributeMap').diff(thisOp.attributes, otherOp.attributes),
                );
              } else {
                retDelta.push(otherOp).delete(opLength);
              }
              break;
          }
          length -= opLength;
        }
      });
      return retDelta.chop();
    };
    expect(() => a.diff(b)).toThrow();
    Delta.prototype.diff = originalDiff;
  });
});