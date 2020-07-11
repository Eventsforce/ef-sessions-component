import { assignDefinedProps } from 'SVUtils'
/**
 * Booking class model
 */
export class Booking {
  type = null
  users = []

  /**
   * @param {object} params
   * @property {('person'|'group'| null)} type
   * @property {Array.<import('./attendee').Attendee>} users - array of users
   */
  constructor(params = {}) {
    assignDefinedProps(params)
  }
}
