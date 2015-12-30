import { createHistory } from 'history'
import { createMemoryHistory } from 'history'

let history

if (typeof IS_CLIENT_BUNDLE !== 'undefined' && IS_CLIENT_BUNDLE) {
	history = createHistory()	
} else {
	history = createMemoryHistory()
}

export default history
