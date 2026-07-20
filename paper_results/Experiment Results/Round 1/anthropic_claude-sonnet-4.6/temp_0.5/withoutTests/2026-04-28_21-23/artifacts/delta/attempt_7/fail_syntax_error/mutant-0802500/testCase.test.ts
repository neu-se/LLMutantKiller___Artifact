push(newOp: Op): this {
  let index = this.ops.length;
  let lastOp = this.ops[index - 1];
  newOp = cloneDeep(newOp);
  if (typeof lastOp === 'object') {
    if (
      typeof newOp.delete === 'number' &&
      typeof lastOp.delete === 'number'
    ) {
      this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };
      return this;
    }
    // Since it does not matter if we insert before or after deleting at the same index,
    // always prefer to insert first
    if (typeof lastOp.delete === 'number' && newOp.insert != null) {
      index -= 1;
      lastOp = this.ops[index - 1];
      if (typeof lastOp !== 'object') {
        this.ops.unshift(newOp);
        return this;
      }
    }
    if (isEqual(newOp.attributes, lastOp.attributes)) {
      if (
        typeof newOp.insert === 'string' &&
        typeof lastOp.insert === 'string'
      ) {
        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
        if (typeof newOp.attributes === 'object') {
          this.ops[index - 1].attributes = newOp.attributes;
        }
        return this;
      } else if (
        typeof newOp.retain === 'number' &&
        typeof lastOp.retain === 'number'
      ) {
        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
        if (typeof newOp.attributes === 'object') {
          this.ops[index - 1].attributes = newOp.attributes;
        }
        return this;
      }
    }
  }
  if (index === this.ops.length) {
    this.ops.push(newOp);
  } else {
    this.ops.splice(index, 0, newOp);
  }
  return this;
}