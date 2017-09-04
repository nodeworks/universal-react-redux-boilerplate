import FirebaseService from 'firebase'
import { Service } from 'react-services-injector'

class Firebase extends Service {
  constructor () {
    super()

    let firebaseRef
    if (!FirebaseService.apps.length) {
      let config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
      }

      firebaseRef = FirebaseService.initializeApp(config)
    } else {
      firebaseRef = FirebaseService.app()
    }

    this.ref = firebaseRef
  }

  authenticate () {
    return this.ref.auth().signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
  }

  get (callback) {
    this.authenticate().then(callback(this.ref)).catch(function (error) {
      console.log(error)
    })
  }
}

export default Firebase
