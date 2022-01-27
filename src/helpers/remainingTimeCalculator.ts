export const calculateRemainingTime = (
  remainder: number,
  portion: number
): number[] => {
  let remainingMonth = Math.ceil(remainder / portion);
  let remainingTime: number[] = [];
  if (remainingMonth > 12) {
    remainingTime = [Math.floor(remainingMonth / 12), Math.ceil(remainingMonth % 12)];
  } else {
    remainingTime = [0, remainingMonth];
  }
  return remainingTime;
};
