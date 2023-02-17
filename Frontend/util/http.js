import axios from "axios";

/**********************************************************/
// USERS DATA HANDLING

// posting userData of registration on (users) collection
export function inputUserData(userData) {
  axios
    .post(
      "https://react-native-ababa-default-rtdb.firebaseio.com/users.json",
      userData
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}

// get data of user from (users) collection in database
export async function fetchUserData() {
  const response = await axios.get(
    "https://react-native-ababa-default-rtdb.firebaseio.com/users.json"
  );

  //storing the objects in users array
  const users = [];
  for (const key in response.data) {
    const userObj = {
      id: key, // every unique key of object data is added as new attr in that object
      email: response.data[key].email,
      rollno: response.data[key].rollno,
      password: response.data[key].password,
    };
    users.push(userObj); // pushing it on users array
  }
  return users;
}
/**********************************************************/

/**********************************************************/
// CREATE CLASS DATA HANDLING

// posting userData of registration on (users) collection
export function inputCreateClassData(createClassData) {
  axios
    .post(
      "https://react-native-ababa-default-rtdb.firebaseio.com/createClass.json",
      createClassData
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}

// get data of class from (createClass) collection in database
export async function fetchCreateClassData() {
  const response = await axios.get(
    "https://react-native-ababa-default-rtdb.firebaseio.com/createClass.json"
  );

  //storing the objects in classes array
  const classes = [];
  for (const key in response.data) {
    const classObj = {
      id: key, // every unique key of object data is added as new attr in that object
      userEmail: response.data[key].userEmail,
      class: response.data[key].class,
      subject: response.data[key].subject,
      code: response.data[key].code,
    };
    classes.push(classObj); // pushing it on users array
  }
  return classes;
}
/**********************************************************/

/**********************************************************/
// JOIN CLASS DATA HANDLING

export function inputJoinClassData(joinClassData) {
  axios
    .post(
      "https://react-native-ababa-default-rtdb.firebaseio.com/joinClass.json",
      joinClassData
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}

// get data of class from (createClass) collection in database
export async function fetchJoinClassData() {
  const response = await axios.get(
    "https://react-native-ababa-default-rtdb.firebaseio.com/joinClass.json"
  );

  //storing the objects in classes array
  const classes = [];
  for (const key in response.data) {
    const classObj = {
      id: key, // every unique key of object data is added as new attr in that object
      createEmail: response.data[key].createEmail,
      joinEmail: response.data[key].joinEmail,
      class: response.data[key].class,
      subject: response.data[key].subject,
      code: response.data[key].code,
    };
    classes.push(classObj); // pushing it on users array
  }
  return classes;
}
/**********************************************************/

/*********************************************************/
// LOGIN USER DATA AT TIME

export function inputLoginData(loginData) {
  axios
    .post(
      "https://react-native-ababa-default-rtdb.firebaseio.com/loginData.json",
      loginData
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}

export async function fetchLoginData() {
  const response = await axios.get(
    "https://react-native-ababa-default-rtdb.firebaseio.com/loginData.json"
  );

  //storing the objects in classes array
  const loggedIn = [];
  for (const key in response.data) {
    const loginObj = {
      id: key, // every unique key of object data is added as new attr in that object
      loggedEmail: response.data[key].loggedEmail,
      dateLogged: response.data[key].dateLogged,
    };
    loggedIn.push(loginObj); // pushing it on users array
  }
  return loggedIn;
}

export function deleteTopLoginIds(id) {
  return axios.delete(
    `https://react-native-ababa-default-rtdb.firebaseio.com/loginData/${id}.json`
  );
}

/***************************************************************/
