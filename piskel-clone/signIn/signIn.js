const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDJ-u6x8-AUYBA6jqIcR8xOgoeetE-LWxk',
  authDomain: 'piskel-clone-fba76.firebaseapp.com',
  databaseURL: 'https://piskel-clone-fba76.firebaseapp.com',
  projectId: 'piskel-clone-fba76',
  storageBucket: 'piskel-clone-fba76.appspot.com',
  messagingSenderId: '480436091162',
};
firebase.initializeApp(firebaseConfig);

export default function signIn() {
  const baseProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(baseProvider).then(function res(result) {
    const img = document.createElement('img');
    img.src = result.user.providerData[0].photoURL;
    img.style.width = '35px';
    img.style.marginLeft = '10px';
    document.getElementById('login').textContent = `${result.user.displayName}`;
    document.getElementById('login').appendChild(img);
    document.getElementById('login').removeEventListener('click', signIn);
  }).catch(function error(err) {
    return err;
  });
}
