import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('optimization with false condition', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('A', { bold: true });
    // Force the condition to be false
    const originalCompose = Delta.prototype.compose;
    Delta.prototype.compose = function(other: Delta): Delta {
      const thisIter = new OpIterator(this.ops);
      const otherIter = new OpIterator(other.ops);
      const ops = [];
      const firstOther = otherIter.peek();
      if (
        firstOther!= null &&
        typeof firstOther.retain === 'number' &&
        firstOther.attributes == null
      ) {
        let firstLeft = firstOther.retain;
        while (
          thisIter.peekType() === 'insert' &&
          thisIter.peekLength() <= firstLeft
        ) {
          firstLeft -= thisIter.peekLength();
          ops.push(thisIter.next());
        }
        if (firstOther.retain - firstLeft > 0) {
          otherIter.next(firstOther.retain - firstLeft);
        }
      }
      const delta = new Delta(ops);
      while (thisIter.hasNext() || otherIter.hasNext()) {
        if (otherIter.peekType() === 'insert') {
          delta.push(otherIter.next());
        } else if (thisIter.peekType() === 'delete') {
          delta.push(thisIter.next());
        } else {
          const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
          const thisOp = thisIter.next(length);
          const otherOp = otherIter.next(length);
          if (otherOp.retain) {
            const newOp: any = {};
            if (typeof thisOp.retain === 'number') {
              newOp.retain =
                typeof otherOp.retain === 'number'? length : otherOp.retain;
            } else {
              if (typeof otherOp.retain === 'number') {
                if (thisOp.retain == null) {
                  newOp.insert = thisOp.insert;
                } else {
                  newOp.retain = thisOp.retain;
                }
              } else {
                const action = thisOp.retain == null? 'insert' : 'retain';
                const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(
                  thisOp[action],
                  otherOp.retain,
                );
                const handler = Delta.getHandler(embedType);
                newOp[action] = {
                  [embedType]: handler.compose(
                    thisData,
                    otherData,
                    action === 'retain',
                  ),
                };
              }
            }
            // Preserve null when composing with a retain, otherwise remove it for inserts
            const attributes = Delta.AttributeMap.compose(
              thisOp.attributes,
              otherOp.attributes,
              typeof thisOp.retain === 'number',
            );
            if (attributes) {
              newOp.attributes = attributes;
            }
            delta.push(newOp);

            // Force the optimization condition to be false
            // if (
            //  !otherIter.hasNext() &&
            //   Delta.equals(delta.ops[delta.ops.length - 1], newOp)
            // ) {
            //   const rest = new Delta(thisIter.rest());
            //   return delta.concat(rest).chop();
            // }
          } else if (
            typeof otherOp.delete === 'number' &&
            (typeof thisOp.retain === 'number' ||
              (typeof thisOp.retain === 'object' && thisOp.retain!== null))
          ) {
            delta.push(otherOp);
          }
        }
      }
      return delta.chop();
    };
    expect(a.compose(b)).toEqual(expected);
    Delta.prototype.compose = originalCompose;
  });
});