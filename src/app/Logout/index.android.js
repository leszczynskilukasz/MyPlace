import firebase from 'firebase';

Settings = () => {
  firebase.auth().signOut();
  return null;
}

export default Settings;
