// Legacy posts carry loose date strings like "2017-11-00 00:00:00" or
// "2018-7-00 00:00:00" (day 00, single-digit month). The old Gatsby site
// formatted these with moment.js, which rolls a day of "00" back to the last
// day of the previous month (e.g. 2019-07-00 -> June 30, 2019). Native Date
// behaves identically with day 0, so we reuse it to stay faithful.

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDate(raw: string): Date {
  const datePart = raw.trim().split(/[ T]/)[0];
  const [y, m, d] = datePart.split("-").map((n) => parseInt(n, 10));
  // month is 1-based in the source; Date wants 0-based. day defaults to 0,
  // which Date interprets as "last day of the previous month" (matches moment).
  return new Date(y || 0, (m || 1) - 1, Number.isFinite(d) ? d : 0);
}

// Newest-first sort key (matches moment-based ordering of the old site).
export function dateSortKey(raw: string): number {
  return toDate(raw).getTime();
}

// "MMMM DD, YYYY" with a zero-padded day, mirroring the old gatsby formatString.
export function formatDate(raw: string): string {
  const dt = toDate(raw);
  return `${MONTHS[dt.getMonth()]} ${String(dt.getDate()).padStart(2, "0")}, ${dt.getFullYear()}`;
}
