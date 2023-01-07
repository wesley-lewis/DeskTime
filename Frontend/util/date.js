export function date() {
  const date = new Date().toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  return date;
}
