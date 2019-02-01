import * as Base from 'lowdb/adapters/Base'
const sessionStorage = window['sessionStorage']

class SessionStorage extends Base {
  read() {
    const data = sessionStorage.getItem(this.source)
    if (this.deserialize && data) {
      return this.deserialize(data)
    }
    if (this.serialize) {
      sessionStorage.setItem(this.source, this.serialize(this.defaultValue))
    }
    return this.defaultValue
  }

  write(data) {
    if (this.serialize && data) {
      sessionStorage.setItem(this.source, this.serialize(data))
    }
  }
}

export default SessionStorage
