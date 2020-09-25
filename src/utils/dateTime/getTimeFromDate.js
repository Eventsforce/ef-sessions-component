import { format } from 'date-fns'

/**
 * Formats the given date to hh:mm format
 * @param {Date} date - some date ex: 2020-08-03 13:00:00. if null, it will take local date/time
 * @param {boolean} military - whether to format in 24 hr or not
 * @returns {string}
 */
export const getTimeFromDate = (date, military = true) => {
  return format(new Date(date), military ? 'HH:mm' : 'h:mma')
}
