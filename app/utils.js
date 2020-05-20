export function zfill(i) {
  /* Padded a number into 2 digit number string. */
  if (i < 10) {
    return '0' + i.toString();
  } else {
    return i.toString();
  }
}

export function toMonoDigits(num, zfill = true) {
  /* Convert a number to a special monospace number.
  
    Arguments:
      num: Number to be converted.
      zfill: Fill up the returned string to 2 digits with '0' appended. Default to true.
    */
  let digits = toDigits(num, false);

  if (digits === null) {
    return zfill ? String.fromCharCode(0x10, 0x10) : String.fromCharCode(0x10);
  } else {
    if (zfill && digits.length === 1) {
      digits.unshift(0);
    }
    return String.fromCharCode.apply(
      null,
      digits.map((v) => v + 0x10)
    );
  }
}

export function toDigits(num, fromLsb = true) {
  /* Convert a number into array of digits. If the number is zero, return null.
      num: Number to be destructed.
      fromLsb: How the digits ordered in the returned array. Default to true.
        For example, if it's true, number 137 will return [7, 3, 1].
        If it's false, number 137 will return [1, 3, 7]
    */
  let addMethod = fromLsb ? Array.prototype.push : Array.prototype.unshift;

  if (num === 0) {
    return null;
  }
  let ret = [];
  while (num !== 0) {
    addMethod.call(ret, num % 10);
    num = Math.floor(num / 10);
  }
  return ret;
}
