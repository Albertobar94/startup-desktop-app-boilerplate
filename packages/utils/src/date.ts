import baseDayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

baseDayjs.extend(relativeTime);
baseDayjs.extend(utc);

export const dayjs = baseDayjs;
