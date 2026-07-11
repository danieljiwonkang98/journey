const SEOUL_TZ = "Asia/Seoul";

export function formatSeoulHeroTime(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SEOUL_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "12";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value;
  const period = dayPeriod === "AM" ? "오전" : "오후";

  const gmt =
    new Intl.DateTimeFormat("en-US", {
      timeZone: SEOUL_TZ,
      timeZoneName: "shortOffset",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT+9";

  return `${hour}:${minute} ${period} (${gmt})`;
}
