/* @flow */
import FirebaseService from 'firebase'

class Firebase {
  ref: Object

  constructor() {
    let firebaseRef
    if (!FirebaseService.apps.length) {
      const config = {
        apiKey: process.env.FIREBASE_API_KEY || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
        databaseURL: process.env.FIREBASE_DATABASE_URL || '',
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || ''
      }

      firebaseRef = FirebaseService.initializeApp(config)
    }
    else {
      firebaseRef = FirebaseService.app()
    }

    this.ref = firebaseRef
  }

  authenticate() {
    return this.ref
      .auth()
      .signInWithEmailAndPassword(
        process.env.FIREBASE_EMAIL, // eslint-disable-line
        process.env.FIREBASE_PASSWORD // eslint-disable-line
      )
  }

  get(callback: Function) {
    this.authenticate().then(callback(this.ref)).catch(error => {
      console.log(error) // eslint-disable-line no-console
    })
  }
}

export default Firebase
