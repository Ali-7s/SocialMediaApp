import {format, parseISO} from "date-fns";

export const formatDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "hh:mm a '·' MMM d, yyyy");
}