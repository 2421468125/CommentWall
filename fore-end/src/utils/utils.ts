function getStandardDate(d: Date): string {
  const timeStringArray = String(d).split(" ");
  return `${timeStringArray[3]} ${timeStringArray[1]} ${timeStringArray[2]} ${timeStringArray[4]}`;
}

export { getStandardDate };
