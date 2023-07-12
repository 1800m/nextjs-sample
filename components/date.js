import { parseISO, format } from "date-fns";

export default function Date({ date_string }) {
  const date = parseISO(date_string);
  return <time date_time={date_string}>{format(date, "LLLL d, yyyy")}</time>;
}
