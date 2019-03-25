// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

// export default class App extends Component {
//   constructor(props){
//     super(props)

//     this.state = {
//       name: '',
//       email: '',
//     }
//   }

//   fbAuth() {
//     LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
//       if (result.isCancelled) {
//         console.log('Login');
//       } else {
//         console.log('Login success')
//       }
//     }, function (error) {
//       console.log('Error')
//     })
//   }

//   render() {
//     return (
//       <View>
//         <TouchableOpacity></TouchableOpacity>
//       </View>
//     )
//   }

//   render() {
//     return (
//       <View>
//         <LoginButton
          
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={
//             (error, result) => {
//               console.log(result)
//               if (error) {
//                 // alert("login has error: " + result.error);
//               } else if (result.isCancelled) {
//                 // alert("login is cancelled.");
//               } else {
//                 AccessToken.getCurrentAccessToken().then(
//                   (data) => {
//                     console.log(data)
//                     const infoRequest = new GraphRequest(
//                       '/me?fields=name,picture, email',
//                       null,
//                       this._responseInfoCallback
//                     );
//                     // Start the graph request.
//                     new GraphRequestManager().addRequest(infoRequest).start();
//                   }
//                 )
//               }
//             }
//           }
//           onLogoutFinished={() => alert("logout.")}/>
//           <Text>{this.state.name}</Text>
//           <Text>{this.state.email}</Text>
//       </View>
//     );
//   }

//   //Create response callback.
//   _responseInfoCallback = (error, result) => {
//     if (error) {
//       // alert('Error fetching data: ' + error.toString());
//     } else {
//       console.log('Result ', result);

//       this.setState({
//         name: result.name,
//         email: result.email
//       })
//     }
//   }
// }




import React, { Component } from 'react';
import { View,StyleSheet, Text } from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { ShareApi } from 'react-native-fbsdk';
export default class Login extends Component {
    constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
    }
  }

  // componentDidMount() {
  //   LoginManager.logInWithReadPermissions(['public_profile']).then(
  //     function(result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' +
  //             result.grantedPermissions.toString()
  //         );
  //       }
  //     },
  //     function(error) {
  //       console.log('Login fail with error: ' + error);
  //     }
  //   );
  // }
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(error.message);
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              console.log('click on button')
              AccessToken.getCurrentAccessToken().then(data => {
                    console.log('data', data)
                    const infoRequest = new GraphRequest(
                      '/me?fields=name,picture, email',
                      null,
                      this._responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
        <View style={{marginTop: 20}}>
          <Text>{this.state.name}</Text>
          <Text>{this.state.email}</Text>
        </View>
        
      </View>
    );
  }

  _responseInfoCallback = (error, result) => {
        if (error) {
          // alert('Error fetching data: ' + error.toString());
        } else {
          console.log('Result ', result);
    
          this.setState({
            name: result.name,
            email: result.email
          })
        }
      }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});